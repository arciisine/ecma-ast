import {AST} from "./ast"

export interface VisitParent {
  node:AST.Node|AST.Node[],
  key:string|number
}

export interface Handler {
  <T extends AST.Node>(node:T, visitor?:Visitor):T
}

export class Visitor {

  static NESTED_PROPERTIES =  [
    'body', 'declarations', 'argument', 'arguments', 'alternate', 'consequent',
    'left', 'right', 'init', 'expression', 'callee', 'elements', 
    'handlers', 'handler', 'block', 'finalizer', 'test', 'object', 'property'
  ]

  private parents:VisitParent[] = null;

  constructor(private handlers : {[key:string]:Handler}) {
    
  }

  get parent() {
    return this.parents.length && this.parents[0];
  }

  findParent(pred:(node:VisitParent)=>boolean) {
    return this.parents.find(pred)
  }

  private onStart(node:AST.Node):AST.Node {
    if (node['visited']) {
      return node;
    } else {
      let handler = [node.type, `${node.type}Start`].find(x => !!this.handlers[x]);
      if (handler) {        
        return this.handlers[node.type](node, this);
      }
    }
  }

  private onEnd(node:AST.Node):AST.Node {
    node['visited'] = true; //Set visited on exit
    if (this.handlers[`${node.type}End`]) {
      return this.handlers[`${node.type}End`](node, this);
    }
  }

  private visit(node:AST.Node):AST.Node {
    let result = this.onStart(node);
    if (result === undefined) {
      result = node;
    }

    if (result !== null) {
      Visitor.NESTED_PROPERTIES.filter(p => !!node[p])
        .forEach(p => { 
          let x = node[p];
          if (Array.isArray(x)) {
            x.forEach((y, i) => {
              this.parents.unshift({node:x, key:i})
              this.visit(y);
              this.parents.shift(); 
            })
          } else if (typeof x !== 'string' && typeof x !== 'boolean' && typeof x !== 'number') {
            this.parents.unshift({node, key:p})
            this.visit(x);
            this.parents.shift();
          }
        });

      result = this.onEnd(node);

      if (result === undefined) {
        result = node;
      }
    }

    let parent = this.parent;
    if (result === null) { //delete
      if (typeof parent.key === 'string') {
        delete parent.node[parent.key];
      } else {
        (parent.node as AST.Node[]).splice(parent.key as number, 1);
      }
    } else if (parent && result !== node) { //Reassign if changed      
      parent.node[parent.key] = result;
    } 

    return result;
  }

  exec<T extends AST.Node>(node:T):T {
    this.parents = [];
    return this.visit(node) as T;
  }
}
