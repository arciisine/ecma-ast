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

  static FUNCTION_TYPES =  [
    'FunctionExpression', 
    'FunctionDeclaration',
    'ArrowFunctionExpression'
  ].reduce((acc, t) => acc[t] = true && acc, {});

  private parents:VisitParent[] = null;

  constructor(private handlers : {[key:string]:Handler}) {
    
  }

  get parent() {
    return this.parents.length && this.parents[0];
  }

  findParent(pred:(node:VisitParent)=>boolean) {
    return this.parents.find(pred)
  }

  private execHandler(fn:Handler, node:AST.Node):AST.Node {
    let res = fn ? fn.call(this, node, this) : node;
    return res === undefined ? node : res;
  }

  private onStart(node:AST.Node, key:string = null):AST.Node {
    if (node['visited']) {
      return node;
    } else {
      key = key || node.type;
      let handler = this.handlers[`${key}Start`] || this.handlers[key];
      return this.execHandler(handler, node);
    }
  }

  private onEnd(node:AST.Node, key:string = null):AST.Node {
    return this.execHandler(this.handlers[`${key || node.type}End`], node);
  }

  private finish(result:AST.Node):AST.Node {
    let parent = this.parent;
    if (result === null) { //delete
      if (typeof parent.key === 'string') {
        delete parent.node[parent.key];
      } else {
        (parent.node as AST.Node[]).splice(parent.key as number, 1);
      }
    } else if (parent && result) { //Reassign if changed      
      parent.node[parent.key] = result;
    } 
    return result;
  }

  private visit(node:AST.Node):AST.Node {
    let keys = [node.type];

    if (Visitor.FUNCTION_TYPES[node.type]) {
      keys.push('Function');
    }

    for (let key of keys) {
      node = this.onStart(node, key);
    }

    if (!node) {
      return this.finish(node);
    }

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
