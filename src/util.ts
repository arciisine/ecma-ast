/// <reference path="../node_modules/@types/esprima/index.d.ts" />

import * as _ from "lodash"
import * as esprima from "esprima"
import * as escodegen from './escodegen';
import {AST} from "./ast"
import {Macro} from './macro';
import {Visitor, Handler} from './visitor';


declare var global,window;
let _global = global || window;

export class Util {
  
  static parseExpression<T extends AST.Node>(expr:string):T {
    let res =  (esprima.parse(expr) as any).body[0] as T;
    return res;
  }

  static compileExpression(node:AST.Node):string {
    return escodegen.generate(node);
  }

  static parse(fn:Function|string):AST.FunctionExpression {
    return Util.parseExpression<AST.FunctionExpression>(fn.toString());
  }
    
  static compile(node:AST.FunctionExpression, globals:any):Function {
    let genSym = Macro.genSymbol.toString();
    genSym = 'function genSym ' + genSym.substring(genSym.indexOf('('))
    let src = `(function() {     
      var id_ = new Date().getTime();
      var genSymbol = ${genSym};
      ${Object.keys(globals || {}).map(k => `var ${k} = ${globals[k].toString()}`).join('\n')} 
      return ${Util.compileExpression(node)}; 
    })()`;
    return eval(src);
  }

  static rewrite(fn:Function, handlers:{[key:string]:Handler}, globals:any = {}) {
    let ast = Util.parse(fn); 
    ast = new Visitor(handlers).exec(ast);
    return Util.compile(ast, globals);
  }

  static isFunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  }

  static isPureFunction(fn:Function, globals:any = {}):boolean {
    let found = {};
    let readId = (p:AST.Pattern) => p.type === "Identifier" ? p['name'] : (p as AST.Identifier).name;

    try {
      new Visitor({
        ArrowFunctionExpression : (x:AST.ArrowExpression) => {
          x.params.forEach(p => {
            found[readId(p)] = true;
          })
        },
        FunctionDeclaration : (x:AST.FunctionDeclaration) => {
          x.params.forEach(p => {
            found[readId(p)] = true;
          })
        },
        VariableDeclaration : (x:AST.VariableDeclaration) => {
          x.declarations.forEach(d => {
            found[readId(d.id)] = true
          })
        },
        Identifier : (x:AST.Identifier, visitor:Visitor) => {
          let parent = visitor.parent.node as AST.Node;
          if (parent.type === 'MemberExpression') {
            if (((parent as AST.MemberExpression).object as AST.Identifier).name != x.name) {
              return;
            }
          } 
          if (!found[x.name] && !_global[x.name] && !globals[x.name]) {
            throw new Error(`Read before declare ${x.name}`); 
          }
        }
      }).exec(Util.parse(fn));
      return true;
    } catch (e) {
      return false;
    }
  }
}