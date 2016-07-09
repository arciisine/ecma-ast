import {AST} from './ast';

export class Guard {
    static isFunction(x:AST.Node):x is AST.ASTFunction { return x.type === 'FunctionDeclaration' || x.type === 'FunctionExpression' || x.type === 'ArrayExpression'; }
    static isEmptyStatement(x:AST.Node):x is AST.EmptyStatement { return x.type === 'EmptyStatement'; }
    static isBlockStatement(x:AST.Node):x is AST.BlockStatement { return x.type === 'BlockStatement'; }
    static isExpressionStatement(x:any):x is AST.ExpressionStatement { return x.type === 'ExpressionStatement'; }
    static isIfStatement(x:AST.Node):x is AST.IfStatement { return x.type === 'IfStatement'; }
    static isLabeledStatement(x:AST.Node):x is AST.LabeledStatement { return x.type === 'LabeledStatement'; }
    static isBreakStatement(x:AST.Node):x is AST.BreakStatement { return x.type === 'BreakStatement'; }
    static isContinueStatement(x:AST.Node):x is AST.ContinueStatement { return x.type === 'ContinueStatement'; }
    static isWithStatement(x:AST.Node):x is AST.WithStatement { return x.type === 'WithStatement'; }
    static isSwitchStatement(x:AST.Node):x is AST.SwitchStatement { return x.type === 'SwitchStatement'; }
    static isReturnStatement(x:AST.Node):x is AST.ReturnStatement { return x.type === 'ReturnStatement'; }
    static isThrowStatement(x:AST.Node):x is AST.ThrowStatement { return x.type === 'ThrowStatement'; }
    static isTryStatement(x:AST.Node):x is AST.TryStatement { return x.type === 'TryStatement'; }
    static isWhileStatement(x:AST.Node):x is AST.WhileStatement { return x.type === 'WhileStatement'; }
    static isDoWhileStatement(x:AST.Node):x is AST.DoWhileStatement { return x.type === 'DoWhileStatement'; }
    static isForStatement(x:AST.Node):x is AST.ForStatement { return x.type === 'ForStatement'; }
    static isForInStatement(x:AST.Node):x is AST.ForInStatement { return x.type === 'ForInStatement'; }
    static isForOfStatement(x:AST.Node):x is AST.ForOfStatement { return x.type === 'ForOfStatement'; }
    static isLetStatement(x:AST.Node):x is AST.LetStatement { return x.type === 'LetStatement'; }
    static isDebuggerStatement(x:AST.Node):x is AST.DebuggerStatement { return x.type === 'DebuggerStatement'; }
    static isFunctionDeclaration(x:AST.Node):x is AST.FunctionDeclaration { return x.type === 'FunctionDeclaration'; }
    static isVariableDeclaration(x:AST.Node):x is AST.VariableDeclaration { return x.type === 'VariableDeclaration'; }
    static isVariableDeclarator(x:AST.Node):x is AST.VariableDeclarator { return x.type === 'VariableDeclarator'; }
    static isThisExpression(x:AST.Node):x is AST.ThisExpression { return x.type === 'ThisExpression'; }
    static isArrayExpression(x:AST.Node):x is AST.ArrayExpression { return x.type === 'ArrayExpression'; }
    static isObjectExpression(x:AST.Node):x is AST.ObjectExpression { return x.type === 'ObjectExpression'; }
    static isProperty(x:AST.Node):x is AST.Property { return x.type === 'Property'; }
    static isFunctionExpression(x:AST.Node):x is AST.FunctionExpression { return x.type === 'FunctionExpression'; }
    static isArrowExpression(x:AST.Node):x is AST.ArrowExpression { return x.type === 'ArrowExpression'; }
    static isSequenceExpression(x:AST.Node):x is AST.SequenceExpression { return x.type === 'SequenceExpression'; }
    static isUnaryExpression(x:AST.Node):x is AST.UnaryExpression { return x.type === 'UnaryExpression'; }
    static isBinaryExpression(x:AST.Node):x is AST.BinaryExpression { return x.type === 'BinaryExpression'; }
    static isAssignmentExpression(x:AST.Node):x is AST.AssignmentExpression { return x.type === 'AssignmentExpression'; }
    static isUpdateExpression(x:AST.Node):x is AST.UpdateExpression { return x.type === 'UpdateExpression'; }
    static isLogicalExpression(x:AST.Node):x is AST.LogicalExpression { return x.type === 'LogicalExpression'; }
    static isConditionalExpression(x:AST.Node):x is AST.ConditionalExpression { return x.type === 'ConditionalExpression'; }
    static isNewExpression(x:AST.Node):x is AST.NewExpression { return x.type === 'NewExpression'; }
    static isCallExpression(x:AST.Node):x is AST.CallExpression { return x.type === 'CallExpression'; }
    static isMemberExpression(x:AST.Node):x is AST.MemberExpression { return x.type === 'MemberExpression'; }
    static isYieldExpression(x:AST.Node):x is AST.YieldExpression { return x.type === 'YieldExpression'; }
    static isComprehensionExpression(x:AST.Node):x is AST.ComprehensionExpression { return x.type === 'ComprehensionExpression'; }
    static isGeneratorExpression(x:AST.Node):x is AST.GeneratorExpression { return x.type === 'GeneratorExpression'; }
    static isGraphExpression(x:AST.Node):x is AST.GraphExpression { return x.type === 'GraphExpression'; }
    static isGraphIndexExpression(x:AST.Node):x is AST.GraphIndexExpression { return x.type === 'GraphIndexExpression'; }
    static isLetExpression(x:AST.Node):x is AST.LetExpression { return x.type === 'LetExpression'; }
    static isObjectPattern(x:AST.Node):x is AST.ObjectPattern { return x.type === 'ObjectPattern'; }
    static isArrayPattern(x:AST.Node):x is AST.ArrayPattern { return x.type === 'ArrayPattern'; }
    static isSwitchCase(x:AST.Node):x is AST.SwitchCase { return x.type === 'SwitchCase'; }
    static isCatchClause(x:AST.Node):x is AST.CatchClause { return x.type === 'CatchClause'; }
    static isComprehensionBlock(x:AST.Node):x is AST.ComprehensionBlock { return x.type === 'ComprehensionBlock'; }
    static isComprehensionIf(x:AST.Node):x is AST.ComprehensionIf { return x.type === 'ComprehensionIf'; }
    static isIdentifier(x:AST.Node):x is AST.Identifier { return x.type === 'Identifier'; }
    static isLiteral(x:AST.Node):x is AST.Literal { return x.type === 'Literal'; }
}