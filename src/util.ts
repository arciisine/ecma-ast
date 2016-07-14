import {AST} from './ast';
import {CompileUtil} from './compile';
import {ParseUtil} from './parse';
import {Visitor, Handler} from './visitor';

export class Util {

  /**
   * Shorthand for parse, visit, compile
   */
  static rewrite(fn:Function, handlers:{[key:string]:Handler}, globals:any = {}) {
    let ast = ParseUtil.parse(fn); 
    ast = new Visitor(handlers).exec(ast);
    return CompileUtil.compile(ast, globals);
  }

  /**
   * Remove unneeded block scopes
   */
  static reduceBlocks(body:AST.Node[]):AST.Node[] {
    let out = [];
    for (let i = 0; i < body.length; i++) {
      let node = body[i];
      //If you are in a block without any let or const assignments, we can collapse into the parent
      if (AST.isBlockStatement(node) && !node.body.some(y => AST.isVariableDeclaration(y) && y.kind !== 'var')) {
        out.push(...Util.reduceBlocks(node.body))
      } else {
        out.push(node);
      }
    }
    return out;
  }
}