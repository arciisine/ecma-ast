import {AST} from "./ast"
import {Macro} from './macro';

export interface VisitParent {
  container:AST.Node|AST.Node[],
  node:AST.Node,
  key:string|number
}

export interface Handler {
  <T extends AST.Node>(node:T, visitor?:Visitor):T
}

export class Visitor {

  static PREVENT_DESCENT = Macro.Id();
  static DELETE_FLAG = Macro.Id();

  static TYPE_ALIASES =  {
    FunctionExpression      : 'Function', 
    FunctionDeclaration     : 'Function',
    ArrowFunctionExpression : 'Function',
    ForStatement            : 'ForLoop',
    ForOfStatement          : 'ForLoop',
    ForInStatement          : 'ForLoop'
  }

  static exec(handlers:AST.NodeHandler<Visitor>, node:AST.Node) {
    return new Visitor(handlers).exec(node);
  }

  private _parents:VisitParent[] = [];

  constructor(private handlers : AST.NodeHandler<Visitor>) {}

  get parent():VisitParent {
    return this._parents[0];
  }

  get parents():VisitParent[] {
    return this._parents.slice(0)
  }

  findParent(pred:(node:VisitParent)=>boolean) {
    return this._parents.find(pred)
  }

  findParents(pred:(node:VisitParent)=>boolean) {
    return this._parents.filter(pred)
  }

  private execHandler(fn:Handler, node:AST.Node):AST.Node {
    let res = (fn ? fn.call(this.handlers, node, this) : node);
    return (res && res['type']) ? res : node; //Always return a node 
  }

  private onStart(node:AST.Node, key?:string):AST.Node {
    return this.execHandler(this.handlers[key || node.type], node);
  }

  private onEnd(node:AST.Node, key?:string):AST.Node {
    return this.execHandler(this.handlers[`${key || node.type}End`], node);
  }

  private finish(result:AST.Node):AST.Node {
    let parent = this.parent;
    if (result === Visitor.PREVENT_DESCENT) {
      return result;
    } else if (result === Visitor.DELETE_FLAG) {
      if (Array.isArray(parent.container)) {  //Array
        (parent.container as AST.Node[]).splice(parent.key as number, 1);
      } else { //Object
        delete parent.container[parent.key];            
      }
    } else if (parent && result) { //Aassign if returned      
      parent.container[parent.key] = result;
    } 
    return result;
  }

  private visit(node:AST.Node):AST.Node|undefined {
    if (node === null) return;

    let alias = Visitor.TYPE_ALIASES[node.type];
    let keys = alias ? [node.type, alias] : [node.type];

    for (let key of keys) {
      node = this.onStart(node, key);
      if (node === Visitor.PREVENT_DESCENT || node === Visitor.DELETE_FLAG) {
        return this.finish(node);
      }
    }
    let sub = AST.NESTED[node.type];

    if (sub) {
      sub.forEach(p => {
        let x = node[p];
        if (Array.isArray(x)) {
          let len = x.length;
          for (let i = 0; i < len; i++) {
            let y = x[i];
            this._parents.unshift({container:x, key:i, node})
            let res = this.visit(y);
            if (res === Visitor.DELETE_FLAG) {
              i--;
              len--;
            }
            this._parents.shift(); 
          }
        } else {
          this._parents.unshift({container:node, key:p, node})
          this.visit(x);
          this._parents.shift();
        }
      })
    }

    for (let key of keys) {
      node = this.onEnd(node, key);
      if (node === Visitor.DELETE_FLAG) {
        return this.finish(node);
      }
    }

    return this.finish(node);
  }

  exec<T extends AST.Node>(node:T):T {
    this._parents = [];
    let res = this.visit(node);
    return res as T;
  }
}
