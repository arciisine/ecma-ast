import {AST} from "./ast"
import {Macro} from './macro';

export interface VisitParent {
  node:AST.Node|AST.Node[],
  key:string|number
}

export interface Handler {
  <T extends AST.Node>(node:T, visitor?:Visitor):T
}

export class Visitor {

  static SKIP_FLAG = Macro.genSymbol();
  static DELETE_FLAG = Macro.genSymbol();

  static TYPE_ALIASES =  {
    FunctionExpression      : 'Function', 
    FunctionDeclaration     : 'Function',
    ArrowFunctionExpression : 'Function'
  }

  static PRIMITIVE_TYPES = [
    'string', 
    'boolean', 
    'number'
  ].reduce((acc, t) => (acc[t] = true) && acc, {});

  private parents:VisitParent[] = null;

  constructor(private handlers : {[key:string]:Handler}) {}

  get parent() {
    return this.parents.length && this.parents[0];
  }

  findParent(pred:(node:VisitParent)=>boolean) {
    return this.parents.find(pred)
  }

  findParents(pred:(node:VisitParent)=>boolean) {
    return this.parents.filter(pred)
  }

  private execHandler(fn:Handler, node:AST.Node):AST.Node {
    let res = (fn ? fn.call(this, node, this) : node);
    return (res && res['type']) ? res : node; //Always return a node 
  }

  private onStart(node:AST.Node, key:string = null):AST.Node {
    key = key || node.type;
    let handler = this.handlers[`${key}Start`] || this.handlers[key];
    return this.execHandler(handler, node);
  }

  private onEnd(node:AST.Node, key:string = null):AST.Node {
    return this.execHandler(this.handlers[`${key || node.type}End`], node);
  }

  private finish(result:AST.Node):AST.Node {
    let parent = this.parent;
    if (result[Visitor.DELETE_FLAG]) {
      if (Array.isArray(parent.node)) {  //Array
        (parent.node as AST.Node[]).splice(parent.key as number, 1);
      } else { //Object
        delete parent.node[parent.key];            
      }
    } else if (parent && result) { //Reassign if changed      
      parent.node[parent.key] = result;
    } 
    return result;
  }

  private visit(node:AST.Node):AST.Node {
    if (node[Visitor.SKIP_FLAG]) return node;

    let alias = Visitor.TYPE_ALIASES[node.type];
    let keys = alias ? [node.type, alias] : [node.type];

    for (let key of keys) {
      node = this.onStart(node, key);
    }

    if (node[Visitor.SKIP_FLAG]) {
      return this.finish(node);
    }

    AST.NESTED[node.type].forEach(p => { 
      let x = node[p];
      if (Array.isArray(x)) {
        x.forEach((y, i) => {
          this.parents.unshift({node:x, key:i})
          this.visit(y);
          this.parents.shift(); 
        })
      } else if (!!p) {
        this.parents.unshift({node, key:p})
        this.visit(x);
        this.parents.shift();
      }
    });

    for (let key of keys) {
      node = this.onEnd(node, key);
    }

    return this.finish(node);
  }

  exec<T extends AST.Node>(node:T):T {
    this.parents = [];
    return this.visit(node) as T;
  }
}
