/// <reference path="../node_modules/@types/lodash/index.d.ts" />
/// <reference path="../node_modules/@types/esprima/index.d.ts" />

import * as _ from "lodash"
import * as esprima from "esprima"
import * as escodegen from './escodegen';
import {AST} from "./ast"
import {Macro} from './macro';

export interface VisitParent {
  node:AST.Node|AST.Node[],
  key:string|number
}

export interface Transformer {
  <T extends AST.Node>(node:T, parent:VisitParent, allParents?:VisitParent[]):T
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

  static visit<T extends AST.Node>(visitor:Visitor, node:T, parents:VisitParent[] = []):T {   
    node = visitor.process(node, parents[0], parents);
    Transform.NESTED_PROPERTIES.filter(p => !!node[p])
      .forEach(p => { 
        let x = node[p];
        if (Array.isArray(x)) {
          x.forEach((y, i) => { 
            parents.push({node:x, key:i})
            Transform.visit(visitor, y, parents);
            parents.pop(); 
          })
        } else if (typeof x !== 'string' && typeof x !== 'boolean' && typeof x !== 'number') {
          parents.push({node, key:p})
          Transform.visit(visitor, x, parents);
          parents.pop();
        }
      });

    if (parents.length) {
      let parent = parents[parents.length-1];
      parent.node[parent.key] = node;
    }
    return node;
  }

  static parseExpression<T extends AST.Node>(expr:string):T {
    let res =  (esprima.parse(expr) as any).body[0] as T;
    return res;
  }

  static compileExpression(node:AST.Node):string {
    return escodegen.generate(node);
  }

  static parse(fn:Function|string):AST.FunctionExpression {
    return Transform.parseExpression<AST.FunctionExpression>(fn.toString());
  }
    
  static compile(node:AST.FunctionExpression, globals:any):Function {
    let genSym = Macro.genSymbol.toString();
    genSym = 'function genSym ' + genSym.substring(genSym.indexOf('('))
    let src = `(function() {     
      var id_ = new Date().getTime();
      var genSymbol = ${genSym};
      ${Object.keys(globals || {}).map(k => `var ${k} = ${globals[k].toString()}`).join('\n')} 
      return ${Transform.compileExpression(node)}; 
    })()`;
    console.log(src);
    return eval(src);
  }

  static visitor(conf:{[key:string]:Transformer}) {
    let out = {
      process : function<T extends AST.Node>(node:T, parent?:VisitParent, parents?:VisitParent[]):AST.Node {
        if (node['visited']) {
          return node;
        } else {
          node['visited'] = true;
          if (this[node['type'] as string]) {
            let res = this[node['type'] as string](node, parent, parents);
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