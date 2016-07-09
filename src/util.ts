/// <reference path="../node_modules/@types/esprima/index.d.ts" />

import * as _ from "lodash"
import * as esprima from "esprima"
import * as escodegen from './escodegen';
import {AST} from "./ast"
import {Macro} from './macro';
import {Visitor, Handler} from './visitor';

export class Util {
  
  static parseExpression<T extends AST.Node>(expr:string):T {
    let res =  (esprima.parse(expr) as any).body[0] as T;
    return res;
  }

  static compileExpression(node:AST.Node):string {
    return escodegen.generate(node);
  }

  static parse(fn:Function|string):AST.FunctionExpression|AST.ArrowFunctionExpression|AST.FunctionDeclaration {
    let res = Util.parseExpression<AST.Node>(fn.toString());
    let ret:AST.Node = res
    if (AST.isExpressionStatement(res)) {
      ret = res.expression
    }

    if (AST.isFunctionExpression(ret)) {
      return ret;
    } else if (AST.isFunctionDeclaration(ret)) {
      return ret;
    } else if (AST.isArrowFunctionExpression(ret)) {
      return ret;
    }    
  }
    
  static compile(node:AST.Function, globals:any):Function {
    let genSym = Macro.genSymbol.toString();
    genSym = 'function genSym ' + genSym.substring(genSym.indexOf('('))
    let src = `(function() {     
      var id_ = new Date().getTime();
      var genSymbol = ${genSym};
      ${Object.keys(globals || {}).map(k => `var ${k} = ${globals[k].toString()}`).join('\n')} 
      return ${Util.compileExpression(node as any as AST.Node)}; 
    })()`;
    return eval(src);
  }

  static rewrite(fn:Function, handlers:{[key:string]:Handler}, globals:any = {}) {
    let ast = Util.parse(fn); 
    ast = new Visitor(handlers).exec(ast);
    return Util.compile(ast, globals);
  }
}