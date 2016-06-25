/// <reference path="../node_modules/@types/lodash/index.d.ts" />
/// <reference path="../node_modules/@types/esprima/index.d.ts" />

import * as _ from "lodash"
import * as esprima from "esprima"
import * as escodegen from './escodegen';
import {AST} from "./ast"
import {Macro} from './macro';

export interface Transformer {
  <T extends AST.Node>(node:T):T
}

export interface Visitor { 
  process:Transformer
}

export class Transform {
  
  static NESTED_PROPERTIES =  [
    'body', 'declarations', 'argument', 'arguments', 'alternate', 'consequent',
    'left', 'right', 'init', 'expression', 'callee', 'elements', 
    'handlers', 'handler', 'block', 'finalizer', 'test', 'object', 'property'
  ]

  static visit<T extends AST.Node>(visitor:Visitor, node:T, parent:AST.Node|[AST.Node] = null, key:string|number = null):T {   
    node = visitor.process(node);   
    Transform.NESTED_PROPERTIES.filter(p => !!node[p])
      .forEach(p => { 
        let x = node[p];
        if (Array.isArray(x)) {
          x.forEach((y, i) => { Transform.visit(visitor, y, x, i); })
        } else if (typeof x !== 'string' && typeof x !== 'boolean' && typeof x !== 'number') {
          Transform.visit(visitor, x, node, p);
        }
      });

    if (parent) parent[key] = node;
    return node;
  }
  
  static parse(fn:Function|string):AST.FunctionExpression {
    let ast = <AST.FunctionExpression>(esprima.parse(fn.toString()) as any as AST.BlockStatement).body[0];
    return ast;
  }
  
  static compile(node:AST.FunctionExpression, globals:any):Function {
    let genSym = Macro.genSymbol.toString();
    genSym = 'function genSym ' + genSym.substring(genSym.indexOf('('))
    let src = `(function() {     
      var id_ = new Date().getTime();
      var genSymbol = ${genSym};
      ${Object.keys(globals || {}).map(k => `var ${k} = ${globals[k].toString()}`).join('\n')} 
      return ${escodegen.generate(node)}; 
    })()`;
    console.log(src);
    return eval(src);
  }

  static visitor(conf:{[key:string]:Transformer}) {
    let out = {
      process : function<T extends AST.Node>(node:T):AST.Node {
        if (node['visited']) {
          return node;
        } else {
          node['visited'] = true;
          if (this[node['type'] as string]) {
            let res = this[node['type'] as string](node);
            return res || node; 
          } else {
            return node;
          }
        }
      }
    };
    return _.extend(out, conf) as typeof out;
  };
  
  static rewrite(fn:Function, visitor:Visitor, globals:any = {}) {
    let ast = Transform.parse(fn); 
    ast = Transform.visit(visitor, ast);
    return Transform.compile(ast, globals);
  }
}