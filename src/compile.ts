import * as escodegen from './escodegen';
import {AST} from "./ast"
declare var require;

let compile = undefined;

export class CompileUtil {
  
  static compileExpression(node:AST.Node):string {
    return escodegen.generate(node);
  }

  static compile(node:AST.BaseFunction|string, globals:any, optimize:any = null):Function {
    let src = `(function() {
      'use strict';     
      ${Object.keys(globals || {}).map(k => `var ${k} = ${globals[k].toString()}`).join('\n')} 
      return ${typeof node === 'string' ? node : CompileUtil.compileExpression(node)}; 
    })()`;    
  
    if (compile === undefined) {
      try { 
        compile = require('google-closure-compiler-js').compile;
      } catch (e) {
        compile = null;
      }
    }

    if (!!optimize && compile) {
      let flags = {jsCode:[{src}]};
      if (typeof optimize === 'object') {
        for (let k of Object.keys(optimize)) {
          flags[k] = optimize[k];
        }
      }
      let res = compile(flags); 
      src = res.compiledCode;
    }

    return eval.call(null, src);
  }
}