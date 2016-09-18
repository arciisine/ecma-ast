import * as escodegen from './escodegen';
import {AST} from "./ast"

export type Transformer = (string)=>string

export class CompileUtil {
  
  static compileExpression(node:AST.Node, options:escodegen.EscodegenOptions = null):string {
    return escodegen.generate(node, options);
  }

  static compileFunction(node:AST.BaseFunction, globals:any, options:escodegen.EscodegenOptions = null):string {
    let src = `(function() {
      'use strict';
      ${Object.keys(globals || {}).map(k => `var ${k} = ${globals[k].toString()}`).join('\n')} 
      return ${CompileUtil.compileExpression(node, options)}; 
    })()`;
    return src;
  }

  static evaluate<T>(source:string):T {
    return eval.call(null, source) as T;
  }
}