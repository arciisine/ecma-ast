import * as escodegen from './escodegen';
import {AST} from "./ast"

export type Transformer = (string)=>string

export class CompileUtil {
  
  static compileExpression(node:AST.Node, options:escodegen.EscodegenOptions = null):string {
    return escodegen.generate(node, options);
  }

  static compile(node:AST.BaseFunction|string, globals:any, options:escodegen.EscodegenOptions = null, transforms:Transformer[] = null):Function {
    let src = `(function() {
      'use strict';
      ${Object.keys(globals || {}).map(k => `var ${k} = ${globals[k].toString()}`).join('\n')} 
      return ${typeof node === 'string' ? node : CompileUtil.compileExpression(node, options)}; 
    })()`;

    if (transforms) {
      src = transforms
        .filter(x => !!x)
        .reduce((src, fn) => fn(src), src);
    }

    return eval.call(null, src);
  }
}