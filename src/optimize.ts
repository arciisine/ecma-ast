import {Transformer} from './compile';

declare var require;

let closure = undefined;

export class OptimizeUtil {
  static closure(flags:any = {}):Transformer {
    if (closure === undefined) {
      try { 
        closure = require('google-closure-compiler-js').compile;
      } catch (e) {
        closure = null;
      }
    }

    if (closure) {
      return src => {
        let finalFlags = {jsCode:[{src}]};
        for (let k of Object.keys(flags)) {
          finalFlags[k] = flags[k];
        }
        let res = closure(finalFlags); 
        return res.compiledCode;
      }
    } else {
      return null;
    }    
  }
} 