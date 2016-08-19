/// <reference path="../node_modules/@types/esprima/index.d.ts" />
import * as esprima from "esprima"
import {AST} from "./ast"
import {Macro as m} from './macro';

export class ParseUtil {
  
  static parseExpression<T extends AST.Node>(expr:string):T {
    let res =  ParseUtil.parseProgram(expr);
    return res.body[0] as any as T;
  }

  static parseProgram<T extends AST.Node>(expr:string):AST.Program {
    let res =  esprima.parse(expr) as any as AST.Program;
    return res;
  }

  static parse(fn:Function|string):AST.BaseFunction {
    let src = fn.toString();
    //Handle static class methods
    if (src.match(/^function\s*\(/)) {
      src = src.replace(/function/, 'function '+m.genSymbol('__anon'))
    }

    if (src.match(/^\s*[A-Za-z0-9]+\s*\(/)) {
      src = `function ${src}`;
    }

    let res = ParseUtil.parseExpression<AST.Node>(src);
    let ret:AST.Node = res
    if (AST.isExpressionStatement(res)) {
      ret = res.expression
    }

    return ret as any as AST.BaseFunction
  }
}