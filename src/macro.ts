import {AST} from "./ast"

let id_:number = new Date().getTime()%10000;

export class Macro {

  static genSymbol() {
    return "__gen"+parseInt(`${Math.random()*1000}`)+(id_++); 
  }

  static Id(name?:string):AST.Identifier { return {type:"Identifier", name:name||Macro.genSymbol()} }
  static Literal(value:any):AST.Literal { return {type:"Literal",    value } }
	static Block(...body):AST.BlockStatement {  return {type:"BlockStatement", body:body.filter(x => !!x) } }
	static Expr(n:AST.Node):AST.ExpressionStatement { return {type:"ExpressionStatement", expression:n} }
	static Continue(label?:AST.Identifier):AST.ContinueStatement { return {type:"ContinueStatement", label} }
	static Noop():AST.Node { return Macro.Block([]) }

	static Return(e:AST.Expression):AST.ReturnStatement { return {type:"ReturnStatement", argument:e} }
	static Yield(e:AST.Expression, delegate:boolean = false):AST.YieldExpression {
    return {type:"YieldExpression", argument:e, delegate} as AST.YieldExpression
  };

	static Array(size:number = 0):AST.ArrayPattern  {
    return {
      type: "ArrayPattern"
    };
  } 

	static Throw(e:AST.Expression):AST.ThrowStatement {return {type:"ThrowStatement", argument:e}};
  static Call(src:AST.Identifier|AST.Expression, ...args:AST.Expression[]):AST.CallExpression {
    return {type:"CallExpression", callee:src, arguments:args.filter(x => !!x)}
  };

	static Assign(id:AST.Identifier, expr:AST.Expression, op:string = '='):AST.AssignmentExpression  {
    return {
      type : "AssignmentExpression",
      left : id,
      operator : op as any as AST.AssignmentOperator,
      right : expr
    };
  }

	static GetProperty(id:AST.Identifier, prop:AST.Identifier|string):AST.MemberExpression {
    return {
      type : "MemberExpression",
      computed : typeof prop !== 'string',
      object : id,
      property : typeof prop === 'string' ? Macro.Id(prop) : prop,
    };
  }
  
	static Vars(...args):AST.VariableDeclaration {
    let kind:('var'|'const'|'let') = 'var';
    if (args[0] === 'var' || args[0] === 'let' || args[0] === 'const') {
      kind = args.shift();
    }  
    let decls = [];
    for (let i = 0; i < args.length; i+=2) {
      if (args[i] && i <=  args.length) {
        decls.push({type:"VariableDeclarator", id:args[i], init:args[i+1]});
      }
    }
    return {type:"VariableDeclaration", kind, declarations: decls};
  }

	static BinaryExpr(id:AST.Identifier, op:string, val:AST.Expression):AST.BinaryExpression {
    return {
      type : "BinaryExpression",
      left : id,
      operator : op as any as AST.BinaryOperator,
      right : val
    }
  }

  static UnaryExpr(op:string, val:AST.Expression):AST.UnaryExpression {
    return {
      type : "UnaryExpression",    
      operator : op as any as AST.UnaryOperator,
      prefix : true,
      argument : val
    }
  }

  static Negate(val:AST.Expression):AST.UnaryExpression {
    return Macro.UnaryExpr("!", val);
  }

  static Increment(id:AST.Identifier, increment:number = 1):AST.AssignmentExpression {
    return Macro.Assign(id, Macro.Literal(increment), '+=');
  }

  static Labeled(id:AST.Identifier, body:AST.Statement):AST.LabeledStatement {
    return {
      type : "LabeledStatement",
      label : id,
      body
    };
  }

  static ForLoop(id:AST.Identifier, init:AST.Expression, upto:AST.Expression, body:AST.Statement[], increment:number = 1):AST.ForStatement {
    return {
      type : "ForStatement",
      init: Macro.Vars(id, init),
      test: Macro.BinaryExpr(id, '<', upto),
      update: Macro.Increment(id, increment),
      body: Macro.Block(...body)
    };
  }

  static TryCatchFinally(t:AST.Node[], c:AST.Node[] = [], f:AST.Node[] = []):AST.TryStatement {
    return {
      type : "TryStatement",
      block :  Macro.Block(...t),
      handler : {
        type: "CatchClause",
        param : Macro.Id('e'),
        body : Macro.Block(...c),
      },
      finalizer : Macro.Block(...f)
    };
  }
  static Func(id:AST.Identifier, params:AST.Pattern[], body:AST.Node[], generator:boolean = false):AST.FunctionDeclaration {
    return {
      type : "FunctionDeclaration", 
      id,
      params, 
      body : Macro.Block(...body), 
      generator
    };
  } 
  static IfThen(test:AST.Expression, body:AST.Node[], elseBody:AST.Node[] = []):AST.IfStatement {
    let res:any = {
      type : "IfStatement",
      test,
      consequent : Macro.Block(...body)
    }
    if (elseBody) {
      res['alternate']  = Macro.Block(...elseBody)
    };
    return res as AST.IfStatement;
  } 
}