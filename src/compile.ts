import * as escodegen from './escodegen';
import {AST} from "./ast"

export class CompileUtil {
  
  static compileExpression(node:AST.Node):string {
    return escodegen.generate(node);
  }

  static compile(node:AST.BaseFunction|string, globals:any, optimize:any = null):Function {
    let src = `(function() {     
      ${Object.keys(globals || {}).map(k => `var ${k} = ${globals[k].toString()}`).join('\n')} 
      return ${typeof node === 'string' ? node : CompileUtil.compileExpression(node)}; 
    })()`;
    
    return eval.call(null, src);
  }
}