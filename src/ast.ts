export namespace AST {
  export interface Node  {
    type:  string;
    loc?:  SourceLocation;
  }
  export interface SourceLocation  {
    start:  Position;
    end:  Position;
    source?:  string;
  }
  export interface Position  {
    column:  number;
    line:  number;
  }
  export interface Identifier  extends Expression,Pattern {
    type:  "Identifier";
    name:  string;
  }
  export function isIdentifier(n:Node):n is Identifier { return n.type === "Identifier"; } 

  export interface Literal  extends Expression {
    value?:  string | boolean  | number | RegExp;
    type:  "Literal";
  }
  export function isLiteral(n:Node):n is Literal { return n.type === "Literal"; } 

  export interface RegExpLiteral  extends Literal {
    regex: {     pattern: string;     flags: string;   };
  }
  export interface Program  {
    body: (Statement | ModuleDeclaration )[];
    type:  "Program";
    sourceType:  "script" | "module";
  }
  export function isProgram(n:Node):n is Program { return n.type === "Program"; } 

  export interface Function  {
    body:  BlockStatement;
    id?:  Identifier;
    params: (Pattern )[];
    generator:  boolean;
  }
  export interface Statement  extends Node {
    
  }
  export interface ExpressionStatement  extends Statement {
    type:  "ExpressionStatement";
    expression:  Expression;
  }
  export function isExpressionStatement(n:Node):n is ExpressionStatement { return n.type === "ExpressionStatement"; } 

  export interface BlockStatement  extends Statement {
    body: (Statement )[];
    type:  "BlockStatement";
  }
  export function isBlockStatement(n:Node):n is BlockStatement { return n.type === "BlockStatement"; } 

  export interface EmptyStatement  extends Statement {
    type:  "EmptyStatement";
  }
  export function isEmptyStatement(n:Node):n is EmptyStatement { return n.type === "EmptyStatement"; } 

  export interface DebuggerStatement  extends Statement {
    type:  "DebuggerStatement";
  }
  export function isDebuggerStatement(n:Node):n is DebuggerStatement { return n.type === "DebuggerStatement"; } 

  export interface WithStatement  extends Statement {
    body:  Statement;
    object:  Expression;
    type:  "WithStatement";
  }
  export function isWithStatement(n:Node):n is WithStatement { return n.type === "WithStatement"; } 

  export interface ReturnStatement  extends Statement {
    argument?:  Expression;
    type:  "ReturnStatement";
  }
  export function isReturnStatement(n:Node):n is ReturnStatement { return n.type === "ReturnStatement"; } 

  export interface LabeledStatement  extends Statement {
    body:  Statement;
    type:  "LabeledStatement";
    label:  Identifier;
  }
  export function isLabeledStatement(n:Node):n is LabeledStatement { return n.type === "LabeledStatement"; } 

  export interface BreakStatement  extends Statement {
    type:  "BreakStatement";
    label?:  Identifier;
  }
  export function isBreakStatement(n:Node):n is BreakStatement { return n.type === "BreakStatement"; } 

  export interface ContinueStatement  extends Statement {
    type:  "ContinueStatement";
    label?:  Identifier;
  }
  export function isContinueStatement(n:Node):n is ContinueStatement { return n.type === "ContinueStatement"; } 

  export interface IfStatement  extends Statement {
    test:  Expression;
    alternate?:  Statement;
    type:  "IfStatement";
    consequent:  Statement;
  }
  export function isIfStatement(n:Node):n is IfStatement { return n.type === "IfStatement"; } 

  export interface SwitchStatement  extends Statement {
    cases: (SwitchCase )[];
    type:  "SwitchStatement";
    discriminant:  Expression;
  }
  export function isSwitchStatement(n:Node):n is SwitchStatement { return n.type === "SwitchStatement"; } 

  export interface SwitchCase  extends Node {
    type:  "SwitchCase";
    test?:  Expression;
    consequent: (Statement )[];
  }
  export function isSwitchCase(n:Node):n is SwitchCase { return n.type === "SwitchCase"; } 

  export interface ThrowStatement  extends Statement {
    type:  "ThrowStatement";
    argument:  Expression;
  }
  export function isThrowStatement(n:Node):n is ThrowStatement { return n.type === "ThrowStatement"; } 

  export interface TryStatement  extends Statement {
    handler?:  CatchClause;
    type:  "TryStatement";
    finalizer?:  BlockStatement;
    block:  BlockStatement;
  }
  export function isTryStatement(n:Node):n is TryStatement { return n.type === "TryStatement"; } 

  export interface CatchClause  extends Node {
    body:  BlockStatement;
    type:  "CatchClause";
    param:  Pattern;
  }
  export function isCatchClause(n:Node):n is CatchClause { return n.type === "CatchClause"; } 

  export interface WhileStatement  extends Statement {
    test:  Expression;
    body:  Statement;
    type:  "WhileStatement";
  }
  export function isWhileStatement(n:Node):n is WhileStatement { return n.type === "WhileStatement"; } 

  export interface DoWhileStatement  extends Statement {
    body:  Statement;
    test:  Expression;
    type:  "DoWhileStatement";
  }
  export function isDoWhileStatement(n:Node):n is DoWhileStatement { return n.type === "DoWhileStatement"; } 

  export interface ForStatement  extends Statement {
    init?:  VariableDeclaration | Expression;
    update?:  Expression;
    body:  Statement;
    test?:  Expression;
    type:  "ForStatement";
  }
  export function isForStatement(n:Node):n is ForStatement { return n.type === "ForStatement"; } 

  export interface ForInStatement  extends Statement {
    body:  Statement;
    right:  Expression;
    type:  "ForInStatement";
    left:  VariableDeclaration |  Pattern;
  }
  export function isForInStatement(n:Node):n is ForInStatement { return n.type === "ForInStatement"; } 

  export interface Declaration  extends Statement {
    
  }
  export interface FunctionDeclaration  extends Declaration,BaseFunction {
    body:  BlockStatement;
    type:  "FunctionDeclaration";
    id:  Identifier;
  }
  export function isFunctionDeclaration(n:Node):n is FunctionDeclaration { return n.type === "FunctionDeclaration"; } 

  export interface VariableDeclaration  {
    kind:  "var" | "let" | "const";
    declarations: (VariableDeclarator )[];
    type:  "VariableDeclaration";
  }
  export function isVariableDeclaration(n:Node):n is VariableDeclaration { return n.type === "VariableDeclaration"; } 

  export interface VariableDeclarator  extends Node {
    init?:  Expression;
    type:  "VariableDeclarator";
    id:  Pattern;
  }
  export function isVariableDeclarator(n:Node):n is VariableDeclarator { return n.type === "VariableDeclarator"; } 

  export interface Expression  extends Node {
    
  }
  export interface ThisExpression  extends Expression {
    type:  "ThisExpression";
  }
  export function isThisExpression(n:Node):n is ThisExpression { return n.type === "ThisExpression"; } 

  export interface ArrayExpression  {
    type:  "ArrayExpression";
    elements?: (Expression | SpreadElement  )[];
  }
  export function isArrayExpression(n:Node):n is ArrayExpression { return n.type === "ArrayExpression"; } 

  export interface ObjectExpression  extends Expression {
    type:  "ObjectExpression";
    properties: (Property )[];
  }
  export function isObjectExpression(n:Node):n is ObjectExpression { return n.type === "ObjectExpression"; } 

  export interface Property  {
    kind:  "init" | "get" | "set";
    shorthand:  boolean;
    computed:  boolean;
    key:  Expression;
    type:  "Property";
    method:  boolean;
    value:  Expression;
  }
  export function isProperty(n:Node):n is Property { return n.type === "Property"; } 

  export interface FunctionExpression  extends Expression,BaseFunction {
    body:  BlockStatement;
    type:  "FunctionExpression";
  }
  export function isFunctionExpression(n:Node):n is FunctionExpression { return n.type === "FunctionExpression"; } 

  export interface UnaryExpression  extends Expression {
    operator:  UnaryOperator;
    prefix:  boolean;
    type:  "UnaryExpression";
    argument:  Expression;
  }
  export function isUnaryExpression(n:Node):n is UnaryExpression { return n.type === "UnaryExpression"; } 

  export interface UnaryOperator {
    this:"-" | "+" | "!" | "~" | "typeof" | "void" | "delete"
  };

  export interface UpdateExpression  extends Expression {
    operator:  UpdateOperator;
    prefix:  boolean;
    type:  "UpdateExpression";
    argument:  Expression;
  }
  export function isUpdateExpression(n:Node):n is UpdateExpression { return n.type === "UpdateExpression"; } 

  export interface UpdateOperator {
    this:"++" | "--"
  };

  export interface BinaryExpression  extends Expression {
    operator:  BinaryOperator;
    right:  Expression;
    type:  "BinaryExpression";
    left:  Expression;
  }
  export function isBinaryExpression(n:Node):n is BinaryExpression { return n.type === "BinaryExpression"; } 

  export interface BinaryOperator {
    this:"==" | "!=" | "===" | "!==" | "<" | "<=" | ">" | ">=" | "<<" | ">>" | ">>>" | "+" | "-" | "*" | "/" | "%" | " | " | "^" | "&" | "in" | "instanceof"
  };

  export interface AssignmentExpression  {
    operator:  AssignmentOperator;
    right:  Expression;
    type:  "AssignmentExpression";
    left:  Pattern;
  }
  export function isAssignmentExpression(n:Node):n is AssignmentExpression { return n.type === "AssignmentExpression"; } 

  export interface AssignmentOperator {
    this:"=" | "+=" | "-=" | "*=" | "/=" | "%=" | "<<=" | ">>=" | ">>>=" | " | =" | "^=" | "&="
  };

  export interface LogicalExpression  extends Expression {
    operator:  LogicalOperator;
    right:  Expression;
    type:  "LogicalExpression";
    left:  Expression;
  }
  export function isLogicalExpression(n:Node):n is LogicalExpression { return n.type === "LogicalExpression"; } 

  export interface LogicalOperator {
    this:" | "  |  "&&"
  };

  export interface MemberExpression  {
    property:  Expression;
    type:  "MemberExpression";
    computed:  boolean;
    object:  Expression | Super;
  }
  export function isMemberExpression(n:Node):n is MemberExpression { return n.type === "MemberExpression"; } 

  export interface ConditionalExpression  extends Expression {
    test:  Expression;
    alternate:  Expression;
    type:  "ConditionalExpression";
    consequent:  Expression;
  }
  export function isConditionalExpression(n:Node):n is ConditionalExpression { return n.type === "ConditionalExpression"; } 

  export interface CallExpression  {
    type:  "CallExpression";
    callee:  Expression | Super;
    arguments: (Expression | SpreadElement )[];
  }
  export function isCallExpression(n:Node):n is CallExpression { return n.type === "CallExpression"; } 

  export interface NewExpression  {
    callee:  Expression | Super;
    type:  "NewExpression";
    arguments: (Expression | SpreadElement )[];
  }
  export function isNewExpression(n:Node):n is NewExpression { return n.type === "NewExpression"; } 

  export interface SequenceExpression  extends Expression {
    expressions: (Expression )[];
    type:  "SequenceExpression";
  }
  export function isSequenceExpression(n:Node):n is SequenceExpression { return n.type === "SequenceExpression"; } 

  export interface Pattern  extends Node {
    
  }
  export interface ForOfStatement  {
    body:  Statement;
    right:  Expression;
    type:  "ForOfStatement";
    left:  VariableDeclaration |  Pattern;
  }
  export function isForOfStatement(n:Node):n is ForOfStatement { return n.type === "ForOfStatement"; } 

  export interface Super  extends Node {
    type:  "Super";
  }
  export function isSuper(n:Node):n is Super { return n.type === "Super"; } 

  export interface SpreadElement  extends Node {
    type:  "SpreadElement";
    argument:  Expression;
  }
  export function isSpreadElement(n:Node):n is SpreadElement { return n.type === "SpreadElement"; } 

  export interface ArrowFunctionExpression  extends Expression,BaseFunction {
    body:  BlockStatement | Expression;
    type:  "ArrowFunctionExpression";
    expression:  boolean;
  }
  export function isArrowFunctionExpression(n:Node):n is ArrowFunctionExpression { return n.type === "ArrowFunctionExpression"; } 

  export interface YieldExpression  extends Expression {
    argument?:  Expression;
    type:  "YieldExpression";
    delegate:  boolean;
  }
  export function isYieldExpression(n:Node):n is YieldExpression { return n.type === "YieldExpression"; } 

  export interface TemplateLiteral  extends Expression {
    quasis: (TemplateElement )[];
    expressions: (Expression )[];
    type:  "TemplateLiteral";
  }
  export function isTemplateLiteral(n:Node):n is TemplateLiteral { return n.type === "TemplateLiteral"; } 

  export interface TaggedTemplateExpression  extends Expression {
    quasi:  TemplateLiteral;
    tag:  Expression;
    type:  "TaggedTemplateExpression";
  }
  export function isTaggedTemplateExpression(n:Node):n is TaggedTemplateExpression { return n.type === "TaggedTemplateExpression"; } 

  export interface TemplateElement  extends Node {
    tail:  boolean;
    type:  "TemplateElement";
    value: {         cooked: string;         raw: string;     };
  }
  export function isTemplateElement(n:Node):n is TemplateElement { return n.type === "TemplateElement"; } 

  export interface AssignmentProperty  {
    kind:  "init";
    shorthand:  boolean;
    computed:  boolean;
    value:  Pattern;
    key:  Expression;
    type:  "Property";
    method: boolean
  }
  export function isAssignmentProperty(n:Node):n is AssignmentProperty { return n.type === "AssignmentProperty"; } 

  export interface ObjectPattern  extends Pattern {
    type:  "ObjectPattern";
    properties: (AssignmentProperty )[];
  }
  export function isObjectPattern(n:Node):n is ObjectPattern { return n.type === "ObjectPattern"; } 

  export interface ArrayPattern  extends Pattern {
    type:  "ArrayPattern";
    elements?: (Pattern  )[];
  }
  export function isArrayPattern(n:Node):n is ArrayPattern { return n.type === "ArrayPattern"; } 

  export interface RestElement  extends Pattern {
    type:  "RestElement";
    argument:  Pattern;
  }
  export function isRestElement(n:Node):n is RestElement { return n.type === "RestElement"; } 

  export interface AssignmentPattern  extends Pattern {
    right:  Expression;
    type:  "AssignmentPattern";
    left:  Pattern;
  }
  export function isAssignmentPattern(n:Node):n is AssignmentPattern { return n.type === "AssignmentPattern"; } 

  export interface Class  extends Node {
    body:  ClassBody;
    id?:  Identifier;
    superClass?:  Expression;
  }
  export interface ClassBody  extends Node {
    body: (MethodDefinition )[];
    type:  "ClassBody";
  }
  export function isClassBody(n:Node):n is ClassBody { return n.type === "ClassBody"; } 

  export interface MethodDefinition  extends Node {
    kind:  "constructor" | "method" | "get" | "set";
    static:  boolean;
    computed:  boolean;
    key:  Expression;
    type:  "MethodDefinition";
    value:  FunctionExpression;
  }
  export function isMethodDefinition(n:Node):n is MethodDefinition { return n.type === "MethodDefinition"; } 

  export interface ClassDeclaration  extends Class,Declaration {
    type:  "ClassDeclaration";
    id:  Identifier;
  }
  export function isClassDeclaration(n:Node):n is ClassDeclaration { return n.type === "ClassDeclaration"; } 

  export interface ClassExpression  extends Class,Expression {
    type:  "ClassExpression";
  }
  export function isClassExpression(n:Node):n is ClassExpression { return n.type === "ClassExpression"; } 

  export interface MetaProperty  extends Expression {
    type:  "MetaProperty";
    property:  Identifier;
    meta:  Identifier;
  }
  export function isMetaProperty(n:Node):n is MetaProperty { return n.type === "MetaProperty"; } 

  export interface ModuleDeclaration  extends Node {
    
  }
  export interface ModuleSpecifier  extends Node {
    local:  Identifier;
  }
  export interface ImportDeclaration  extends ModuleDeclaration {
    specifiers: (ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier )[];
    type:  "ImportDeclaration";
    source:  Literal;
  }
  export function isImportDeclaration(n:Node):n is ImportDeclaration { return n.type === "ImportDeclaration"; } 

  export interface ImportSpecifier  extends ModuleSpecifier {
    type:  "ImportSpecifier";
    imported:  Identifier;
  }
  export function isImportSpecifier(n:Node):n is ImportSpecifier { return n.type === "ImportSpecifier"; } 

  export interface ImportDefaultSpecifier  extends ModuleSpecifier {
    type:  "ImportDefaultSpecifier";
  }
  export function isImportDefaultSpecifier(n:Node):n is ImportDefaultSpecifier { return n.type === "ImportDefaultSpecifier"; } 

  export interface ImportNamespaceSpecifier  extends ModuleSpecifier {
    type:  "ImportNamespaceSpecifier";
  }
  export function isImportNamespaceSpecifier(n:Node):n is ImportNamespaceSpecifier { return n.type === "ImportNamespaceSpecifier"; } 

  export interface ExportNamedDeclaration  extends ModuleDeclaration {
    specifiers: (ExportSpecifier )[];
    type:  "ExportNamedDeclaration";
    source?:  Literal;
    declaration?:  Declaration;
  }
  export function isExportNamedDeclaration(n:Node):n is ExportNamedDeclaration { return n.type === "ExportNamedDeclaration"; } 

  export interface ExportSpecifier  extends ModuleSpecifier {
    type:  "ExportSpecifier";
    exported:  Identifier;
  }
  export function isExportSpecifier(n:Node):n is ExportSpecifier { return n.type === "ExportSpecifier"; } 

  export interface ExportDefaultDeclaration  extends ModuleDeclaration {
    type:  "ExportDefaultDeclaration";
    declaration:  Declaration | Expression;
  }
  export function isExportDefaultDeclaration(n:Node):n is ExportDefaultDeclaration { return n.type === "ExportDefaultDeclaration"; } 

  export interface ExportAllDeclaration  extends ModuleDeclaration {
    source:  Literal;
    type:  "ExportAllDeclaration";
  }
  export function isExportAllDeclaration(n:Node):n is ExportAllDeclaration { return n.type === "ExportAllDeclaration"; } 

  export interface BaseFunction  extends Node {
    id?:  Identifier;
    params: (Pattern )[];
    generator:  boolean;
  }
  export function isFunction(n:Node):n is BaseFunction { return n.type === "FunctionDeclaration" || n.type === "FunctionExpression" || n.type === "ArrowFunctionExpression" || n.type === "BaseFunction" }
}
