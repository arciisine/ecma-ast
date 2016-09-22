import {Transformer} from './compile';

declare var require;

let closure:((string)=>{compiledCode:string})|null|undefined = undefined;

export class OptimizeUtil {
  static closure(flags:any = {}):Transformer|null {
    if (closure === undefined) {
      try { 
        closure = require('google-closure-compiler-js').compile;
      } catch (e) {
        closure = null;
      }
    }

    if (closure !== null && closure !== undefined) {
      let fn = closure;
      return src => {
        let finalFlags = {jsCode:[{src}]};
        for (let k of Object.keys(flags)) {
          finalFlags[k] = flags[k];
        }
        let res = fn(finalFlags); 
        return res.compiledCode;
      }
    } else {
      return null;
    }    
  }
} 