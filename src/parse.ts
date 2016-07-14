/// <reference path="../node_modules/@types/esprima/index.d.ts" />
import * as esprima from "esprima"
import {AST} from "./ast"

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
    src = /^\s*[A-Za-z0-9]+\s*\(/.test(src) ? `function ${src}` : src

    let res = ParseUtil.parseExpression<AST.Node>(src);
    let ret:AST.Node = res
    if (AST.isExpressionStatement(res)) {
      ret = res.expression
    }

    return ret as any as AST.BaseFunction
  }
}