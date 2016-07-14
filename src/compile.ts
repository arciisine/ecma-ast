import * as escodegen from './escodegen';
import {AST} from "./ast"

export class CompileUtil {
  
  static compileExpression(node:AST.Node):string {
    return escodegen.generate(node);
  }

  static compile(node:AST.BaseFunction, globals:any):Function {
    let src = `(function() {     
      ${Object.keys(globals || {}).map(k => `var ${k} = ${globals[k].toString()}`).join('\n')} 
      return ${CompileUtil.compileExpression(node)}; 
    })()`;
    return eval(src);
  }
}