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

type Flag = (AST.Identifier & {flag?:boolean});
function getToken():Flag {
  let m:Flag = Macro.Id();
  m.flag = true;
  return m;
}
function isFlag(flag?:any):flag is Flag {
  return flag && !!flag['flag'];
}

export class Visitor {

  static PREVENT_DESCENT = getToken();
  static DELETE_FLAG = getToken();

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

  private visitArrayProperty(parent:AST.Node, prop:string) {
    let arr = parent[prop] as AST.Node[];
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      let y = arr[i];
      this._parents.unshift({container:arr, key:i, node:parent})
      let res = this.visit(y);
      if (isFlag(res)) {
        if (res === Visitor.DELETE_FLAG) {
          arr.splice(i, 1);
          i--;
          len--;
        }
      } else if (res) {
        arr[i] = res;
      }
      this._parents.shift(); 
    }
  }

  private visitSingleProperty(parent:AST.Node, prop:string) {
    this._parents.unshift({container:parent, key:prop, node:parent})
    let node = parent[prop];
    let res = this.visit(node);
    if (isFlag(parent)) {
      if (res === Visitor.DELETE_FLAG) {
        delete parent[prop];
      } 
    } else if (res) {
      parent[prop] = res;
    }
    this._parents.shift();
  }

  private visit(node:AST.Node):AST.Node|undefined {
    if (node === null) return;

    let alias = Visitor.TYPE_ALIASES[node.type];
    let keys = alias ? [node.type, alias] : [node.type];
    
    for (let key of keys) {
      if (isFlag(node = this.onStart(node, key))) return node;
    }
    
    //Descend
    for (let prop of AST.NESTED[node.type]||[]) {
      if (Array.isArray(node[prop])) {
        this.visitArrayProperty(node, prop);
      } else {
        this.visitSingleProperty(node, prop);
      }
    }

    for (let key of keys) {
      if (isFlag(node = this.onEnd(node, key))) return node;
    }

    return node;
  }

  exec<T extends AST.Node>(node:T):T {
    this._parents = [];
    let res = this.visit(node);
    return res as T;
  }
}
