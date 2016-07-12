export namespace AST {
  export const NESTED:{[key:string]:string[]} = {}
  export interface Node  {
    type:  string;
  }
  export interface SourceLocation  {
    source:  string;
    end:  Position;
    start:  Position;
  }
  export interface Position  {
    column:  number;
    line:  number;
  }
  export interface Identifier  extends Expression,Pattern {
    name:  string;
  }
  export interface Literal  extends Expression {
    value:  string | boolean  | number | RegExp;
  }
  export interface RegExpLiteral  extends Literal {
    regex: {     pattern: string;     flags: string;   };
  }
  export interface Program  extends Node {
    body: (Statement | ModuleDeclaration )[];
    sourceType:  "script" | "module";
  }
  export interface Function  extends Node {
    body:  BlockStatement;
    params: (Pattern )[];
    id:  Identifier;
    generator:  boolean;
  }
  export interface Statement  extends Node {
    
  }
  export interface ExpressionStatement  extends Statement {
    expression:  Expression;
  }
  export interface BlockStatement  extends Statement {
    body: (Statement )[];
  }
  export interface EmptyStatement  extends Statement {
    
  }
  export interface DebuggerStatement  extends Statement {
    
  }
  export interface WithStatement  extends Statement {
    body:  Statement;
    object:  Expression;
  }
  export interface ReturnStatement  extends Statement {
    argument:  Expression;
  }
  export interface LabeledStatement  extends Statement {
    body:  Statement;
    label:  Identifier;
  }
  export interface BreakStatement  extends Statement {
    label:  Identifier;
  }
  export interface ContinueStatement  extends Statement {
    label:  Identifier;
  }
  export interface IfStatement  extends Statement {
    test:  Expression;
    alternate:  Statement;
    consequent:  Statement;
  }
  export interface SwitchStatement  extends Statement {
    cases: (SwitchCase )[];
    discriminant:  Expression;
  }
  export interface SwitchCase  extends Node {
    test:  Expression;
    consequent: (Statement )[];
  }
  export interface ThrowStatement  extends Statement {
    argument:  Expression;
  }
  export interface TryStatement  extends Statement {
    finalizer:  BlockStatement;
    handler:  CatchClause;
    block:  BlockStatement;
  }
  export interface CatchClause  extends Node {
    body:  BlockStatement;
    param:  Pattern;
  }
  export interface WhileStatement  extends Statement {
    test:  Expression;
    body:  Statement;
  }
  export interface DoWhileStatement  extends Statement {
    body:  Statement;
    test:  Expression;
  }
  export interface ForStatement  extends Statement {
    test:  Expression;
    body:  Statement;
    init:  VariableDeclaration | Expression;
    update:  Expression;
  }
  export interface ForInStatement  extends Statement {
    body:  Statement;
    right:  Expression;
    left:  VariableDeclaration |  Pattern;
  }
  export interface Declaration  extends Statement {
    
  }
  export interface FunctionDeclaration  extends Declaration,BaseFunction {
    body:  BlockStatement;
  }
  export interface VariableDeclaration  extends Declaration {
    kind:  "var" | "let" | "const";
    declarations: (VariableDeclarator )[];
  }
  export interface VariableDeclarator  extends Node {
    init:  Expression;
    id:  Pattern;
  }
  export interface Expression  extends Node {
    
  }
  export interface ThisExpression  extends Expression {
    
  }
  export interface ArrayExpression  extends Expression {
    elements: (Expression | SpreadElement  )[];
  }
  export interface ObjectExpression  extends Expression {
    properties: (Property )[];
  }
  export interface Property  extends Node {
    kind:  "init" | "get" | "set";
    shorthand:  boolean;
    computed:  boolean;
    value:  Expression;
    key:  Expression;
    method:  boolean;
  }
  export interface FunctionExpression  extends Expression,BaseFunction {
    body:  BlockStatement;
  }
  export interface UnaryExpression  extends Expression {
    operator:  UnaryOperator;
    prefix:  boolean;
    argument:  Expression;
  }
  export type UnaryOperator = "-" | "+" | "!" | "~" | "typeof" | "void" | "delete";

  export interface UpdateExpression  extends Expression {
    operator:  UpdateOperator;
    prefix:  boolean;
    argument:  Expression;
  }
  export type UpdateOperator = "++" | "--";

  export interface BinaryExpression  extends Expression {
    operator:  BinaryOperator;
    right:  Expression;
    left:  Expression;
  }
  export type BinaryOperator = "==" | "!=" | "===" | "!==" | "<" | "<=" | ">" | ">=" | "<<" | ">>" | ">>>" | "+" | "-" | "*" | "/" | "%" | " | " | "^" | "&" | "in" | "instanceof";

  export interface AssignmentExpression  extends Expression {
    operator:  AssignmentOperator;
    right:  Expression;
    left:  Pattern;
  }
  export type AssignmentOperator = "=" | "+=" | "-=" | "*=" | "/=" | "%=" | "<<=" | ">>=" | ">>>=" | " | =" | "^=" | "&=";

  export interface LogicalExpression  extends Expression {
    operator:  LogicalOperator;
    right:  Expression;
    left:  Expression;
  }
  export type LogicalOperator = " | "  |  "&&";

  export interface MemberExpression  extends Expression,Pattern {
    property:  Expression;
    object:  Expression | Super;
    computed:  boolean;
  }
  export interface ConditionalExpression  extends Expression {
    test:  Expression;
    alternate:  Expression;
    consequent:  Expression;
  }
  export interface CallExpression  extends Expression {
    callee:  Expression | Super;
    arguments: (Expression | SpreadElement )[];
  }
  export interface NewExpression  extends CallExpression {
    
  }
  export interface SequenceExpression  extends Expression {
    expressions: (Expression )[];
  }
  export interface Pattern  extends Node {
    
  }
  export interface ForOfStatement  extends ForInStatement {
    
  }
  export interface Super  extends Node {
    
  }
  export interface SpreadElement  extends Node {
    argument:  Expression;
  }
  export interface ArrowFunctionExpression  extends Expression,BaseFunction {
    body:  BlockStatement | Expression;
    expression:  boolean;
  }
  export interface YieldExpression  extends Expression {
    argument:  Expression;
    delegate:  boolean;
  }
  export interface TemplateLiteral  extends Expression {
    quasis: (TemplateElement )[];
    expressions: (Expression )[];
  }
  export interface TaggedTemplateExpression  extends Expression {
    quasi:  TemplateLiteral;
    tag:  Expression;
  }
  export interface TemplateElement  extends Node {
    tail:  boolean;
    value: {         cooked: string;         raw: string;     };
  }
  export interface AssignmentProperty  extends Property {
    kind:  "init";
    method: boolean
    value:  Pattern;
  }
  export interface ObjectPattern  extends Pattern {
    properties: (AssignmentProperty )[];
  }
  export interface ArrayPattern  extends Pattern {
    elements: (Pattern  )[];
  }
  export interface RestElement  extends Pattern {
    argument:  Pattern;
  }
  export interface AssignmentPattern  extends Pattern {
    right:  Expression;
    left:  Pattern;
  }
  export interface Class  extends Node {
    body:  ClassBody;
    id:  Identifier;
    superClass:  Expression;
  }
  export interface ClassBody  extends Node {
    body: (MethodDefinition )[];
  }
  export interface MethodDefinition  extends Node {
    kind:  "constructor" | "method" | "get" | "set";
    computed:  boolean;
    value:  FunctionExpression;
    static:  boolean;
    key:  Expression;
  }
  export interface ClassDeclaration  extends Class,Declaration {
    id:  Identifier;
  }
  export interface ClassExpression  extends Class,Expression {
    
  }
  export interface MetaProperty  extends Expression {
    property:  Identifier;
    meta:  Identifier;
  }
  export interface ModuleDeclaration  extends Node {
    
  }
  export interface ModuleSpecifier  extends Node {
    local:  Identifier;
  }
  export interface ImportDeclaration  extends ModuleDeclaration {
    specifiers: (ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier )[];
    source:  Literal;
  }
  export interface ImportSpecifier  extends ModuleSpecifier {
    imported:  Identifier;
  }
  export interface ImportDefaultSpecifier  extends ModuleSpecifier {
    
  }
  export interface ImportNamespaceSpecifier  extends ModuleSpecifier {
    
  }
  export interface ExportNamedDeclaration  extends ModuleDeclaration {
    specifiers: (ExportSpecifier )[];
    source:  Literal;
    declaration:  Declaration;
  }
  export interface ExportSpecifier  extends ModuleSpecifier {
    exported:  Identifier;
  }
  export interface ExportDefaultDeclaration  extends ModuleDeclaration {
    declaration:  Declaration | Expression;
  }
  export interface ExportAllDeclaration  extends ModuleDeclaration {
    source:  Literal;
  }
  export interface BaseFunction  extends Node {
    params: (Pattern )[];
    id:  Identifier;
    generator:  boolean;
  }
  export function Identifier(o:{name:  string,}):Identifier {
    return (o["type"] = "Identifier" && o) as Identifier
  }
  NESTED["Identifier"] = []; 
  export function Literal(o:{value:  string | boolean  | number | RegExp,}):Literal {
    return (o["type"] = "Literal" && o) as Literal
  }
  NESTED["Literal"] = []; 
  export function Program(o:{body: (Statement | ModuleDeclaration )[],
    sourceType:  "script" | "module",}):Program {
    return (o["type"] = "Program" && o) as Program
  }
  NESTED["Program"] = ["body"]; 
  export function ExpressionStatement(o:{expression:  Expression,}):ExpressionStatement {
    return (o["type"] = "ExpressionStatement" && o) as ExpressionStatement
  }
  NESTED["ExpressionStatement"] = ["expression"]; 
  export function BlockStatement(o:{body: (Statement )[],}):BlockStatement {
    return (o["type"] = "BlockStatement" && o) as BlockStatement
  }
  NESTED["BlockStatement"] = ["body"]; 
  export function EmptyStatement(o:{}):EmptyStatement {
    return (o["type"] = "EmptyStatement" && o) as EmptyStatement
  }
  NESTED["EmptyStatement"] = []; 
  export function DebuggerStatement(o:{}):DebuggerStatement {
    return (o["type"] = "DebuggerStatement" && o) as DebuggerStatement
  }
  NESTED["DebuggerStatement"] = []; 
  export function WithStatement(o:{body:  Statement,
    object:  Expression,}):WithStatement {
    return (o["type"] = "WithStatement" && o) as WithStatement
  }
  NESTED["WithStatement"] = ["body","object"]; 
  export function ReturnStatement(o:{argument:  Expression,}):ReturnStatement {
    return (o["type"] = "ReturnStatement" && o) as ReturnStatement
  }
  NESTED["ReturnStatement"] = ["argument"]; 
  export function LabeledStatement(o:{body:  Statement,
    label:  Identifier,}):LabeledStatement {
    return (o["type"] = "LabeledStatement" && o) as LabeledStatement
  }
  NESTED["LabeledStatement"] = ["body","label"]; 
  export function BreakStatement(o:{label:  Identifier,}):BreakStatement {
    return (o["type"] = "BreakStatement" && o) as BreakStatement
  }
  NESTED["BreakStatement"] = ["label"]; 
  export function ContinueStatement(o:{label:  Identifier,}):ContinueStatement {
    return (o["type"] = "ContinueStatement" && o) as ContinueStatement
  }
  NESTED["ContinueStatement"] = ["label"]; 
  export function IfStatement(o:{test:  Expression,
    alternate:  Statement,
    consequent:  Statement,}):IfStatement {
    return (o["type"] = "IfStatement" && o) as IfStatement
  }
  NESTED["IfStatement"] = ["test","alternate","consequent"]; 
  export function SwitchStatement(o:{cases: (SwitchCase )[],
    discriminant:  Expression,}):SwitchStatement {
    return (o["type"] = "SwitchStatement" && o) as SwitchStatement
  }
  NESTED["SwitchStatement"] = ["cases","discriminant"]; 
  export function SwitchCase(o:{test:  Expression,
    consequent: (Statement )[],}):SwitchCase {
    return (o["type"] = "SwitchCase" && o) as SwitchCase
  }
  NESTED["SwitchCase"] = ["test","consequent"]; 
  export function ThrowStatement(o:{argument:  Expression,}):ThrowStatement {
    return (o["type"] = "ThrowStatement" && o) as ThrowStatement
  }
  NESTED["ThrowStatement"] = ["argument"]; 
  export function TryStatement(o:{finalizer:  BlockStatement,
    handler:  CatchClause,
    block:  BlockStatement,}):TryStatement {
    return (o["type"] = "TryStatement" && o) as TryStatement
  }
  NESTED["TryStatement"] = ["finalizer","handler","block"]; 
  export function CatchClause(o:{body:  BlockStatement,
    param:  Pattern,}):CatchClause {
    return (o["type"] = "CatchClause" && o) as CatchClause
  }
  NESTED["CatchClause"] = ["body","param"]; 
  export function WhileStatement(o:{test:  Expression,
    body:  Statement,}):WhileStatement {
    return (o["type"] = "WhileStatement" && o) as WhileStatement
  }
  NESTED["WhileStatement"] = ["test","body"]; 
  export function DoWhileStatement(o:{body:  Statement,
    test:  Expression,}):DoWhileStatement {
    return (o["type"] = "DoWhileStatement" && o) as DoWhileStatement
  }
  NESTED["DoWhileStatement"] = ["body","test"]; 
  export function ForStatement(o:{body:  Statement,
    init:  VariableDeclaration | Expression,
    test:  Expression,
    update:  Expression,}):ForStatement {
    return (o["type"] = "ForStatement" && o) as ForStatement
  }
  NESTED["ForStatement"] = ["body","init","test","update"]; 
  export function ForInStatement(o:{body:  Statement,
    right:  Expression,
    left:  VariableDeclaration |  Pattern,}):ForInStatement {
    return (o["type"] = "ForInStatement" && o) as ForInStatement
  }
  NESTED["ForInStatement"] = ["body","right","left"]; 
  export function FunctionDeclaration(o:{body:  BlockStatement,
    params: (Pattern )[],
    generator:  boolean,
    id:  Identifier,}):FunctionDeclaration {
    return (o["type"] = "FunctionDeclaration" && o) as FunctionDeclaration
  }
  NESTED["FunctionDeclaration"] = ["body","params","id"]; 
  export function VariableDeclaration(o:{kind:  "var" | "let" | "const",
    declarations: (VariableDeclarator )[],}):VariableDeclaration {
    return (o["type"] = "VariableDeclaration" && o) as VariableDeclaration
  }
  NESTED["VariableDeclaration"] = ["declarations"]; 
  export function VariableDeclarator(o:{init:  Expression,
    id:  Pattern,}):VariableDeclarator {
    return (o["type"] = "VariableDeclarator" && o) as VariableDeclarator
  }
  NESTED["VariableDeclarator"] = ["init","id"]; 
  export function ThisExpression(o:{}):ThisExpression {
    return (o["type"] = "ThisExpression" && o) as ThisExpression
  }
  NESTED["ThisExpression"] = []; 
  export function ArrayExpression(o:{elements: (Expression | SpreadElement  )[],}):ArrayExpression {
    return (o["type"] = "ArrayExpression" && o) as ArrayExpression
  }
  NESTED["ArrayExpression"] = ["elements"]; 
  export function ObjectExpression(o:{properties: (Property )[],}):ObjectExpression {
    return (o["type"] = "ObjectExpression" && o) as ObjectExpression
  }
  NESTED["ObjectExpression"] = ["properties"]; 
  export function Property(o:{kind:  "init" | "get" | "set",
    shorthand:  boolean,
    computed:  boolean,
    value:  Expression,
    key:  Expression,
    method:  boolean,}):Property {
    return (o["type"] = "Property" && o) as Property
  }
  NESTED["Property"] = ["value","key"]; 
  export function FunctionExpression(o:{body:  BlockStatement,
    params: (Pattern )[],
    generator:  boolean,
    id:  Identifier,}):FunctionExpression {
    return (o["type"] = "FunctionExpression" && o) as FunctionExpression
  }
  NESTED["FunctionExpression"] = ["body","params","id"]; 
  export function UnaryExpression(o:{operator:  UnaryOperator,
    prefix:  boolean,
    argument:  Expression,}):UnaryExpression {
    return (o["type"] = "UnaryExpression" && o) as UnaryExpression
  }
  NESTED["UnaryExpression"] = ["operator","argument"]; 
  export function UpdateExpression(o:{operator:  UpdateOperator,
    prefix:  boolean,
    argument:  Expression,}):UpdateExpression {
    return (o["type"] = "UpdateExpression" && o) as UpdateExpression
  }
  NESTED["UpdateExpression"] = ["operator","argument"]; 
  export function BinaryExpression(o:{operator:  BinaryOperator,
    right:  Expression,
    left:  Expression,}):BinaryExpression {
    return (o["type"] = "BinaryExpression" && o) as BinaryExpression
  }
  NESTED["BinaryExpression"] = ["operator","right","left"]; 
  export function AssignmentExpression(o:{operator:  AssignmentOperator,
    right:  Expression,
    left:  Pattern,}):AssignmentExpression {
    return (o["type"] = "AssignmentExpression" && o) as AssignmentExpression
  }
  NESTED["AssignmentExpression"] = ["operator","right","left"]; 
  export function LogicalExpression(o:{operator:  LogicalOperator,
    right:  Expression,
    left:  Expression,}):LogicalExpression {
    return (o["type"] = "LogicalExpression" && o) as LogicalExpression
  }
  NESTED["LogicalExpression"] = ["operator","right","left"]; 
  export function MemberExpression(o:{property:  Expression,
    computed:  boolean,
    object:  Expression | Super,}):MemberExpression {
    return (o["type"] = "MemberExpression" && o) as MemberExpression
  }
  NESTED["MemberExpression"] = ["property","object"]; 
  export function ConditionalExpression(o:{test:  Expression,
    alternate:  Expression,
    consequent:  Expression,}):ConditionalExpression {
    return (o["type"] = "ConditionalExpression" && o) as ConditionalExpression
  }
  NESTED["ConditionalExpression"] = ["test","alternate","consequent"]; 
  export function CallExpression(o:{callee:  Expression | Super,
    arguments: (Expression | SpreadElement )[],}):CallExpression {
    return (o["type"] = "CallExpression" && o) as CallExpression
  }
  NESTED["CallExpression"] = ["callee","arguments"]; 
  export function NewExpression(o:{callee:  Expression | Super,
    arguments: (Expression | SpreadElement )[],}):NewExpression {
    return (o["type"] = "NewExpression" && o) as NewExpression
  }
  NESTED["NewExpression"] = ["callee","arguments"]; 
  export function SequenceExpression(o:{expressions: (Expression )[],}):SequenceExpression {
    return (o["type"] = "SequenceExpression" && o) as SequenceExpression
  }
  NESTED["SequenceExpression"] = ["expressions"]; 
  export function ForOfStatement(o:{body:  Statement,
    right:  Expression,
    left:  VariableDeclaration |  Pattern,}):ForOfStatement {
    return (o["type"] = "ForOfStatement" && o) as ForOfStatement
  }
  NESTED["ForOfStatement"] = ["body","right","left"]; 
  export function Super(o:{}):Super {
    return (o["type"] = "Super" && o) as Super
  }
  NESTED["Super"] = []; 
  export function SpreadElement(o:{argument:  Expression,}):SpreadElement {
    return (o["type"] = "SpreadElement" && o) as SpreadElement
  }
  NESTED["SpreadElement"] = ["argument"]; 
  export function ArrowFunctionExpression(o:{body:  BlockStatement | Expression,
    params: (Pattern )[],
    generator:  boolean,
    expression:  boolean,
    id:  Identifier,}):ArrowFunctionExpression {
    return (o["type"] = "ArrowFunctionExpression" && o) as ArrowFunctionExpression
  }
  NESTED["ArrowFunctionExpression"] = ["body","params","id"]; 
  export function YieldExpression(o:{argument:  Expression,
    delegate:  boolean,}):YieldExpression {
    return (o["type"] = "YieldExpression" && o) as YieldExpression
  }
  NESTED["YieldExpression"] = ["argument"]; 
  export function TemplateLiteral(o:{quasis: (TemplateElement )[],
    expressions: (Expression )[],}):TemplateLiteral {
    return (o["type"] = "TemplateLiteral" && o) as TemplateLiteral
  }
  NESTED["TemplateLiteral"] = ["quasis","expressions"]; 
  export function TaggedTemplateExpression(o:{quasi:  TemplateLiteral,
    tag:  Expression,}):TaggedTemplateExpression {
    return (o["type"] = "TaggedTemplateExpression" && o) as TaggedTemplateExpression
  }
  NESTED["TaggedTemplateExpression"] = ["quasi","tag"]; 
  export function TemplateElement(o:{tail:  boolean,
    value: {         cooked: string,         raw: string,     },}):TemplateElement {
    return (o["type"] = "TemplateElement" && o) as TemplateElement
  }
  NESTED["TemplateElement"] = []; 
  export function AssignmentProperty(o:{kind:  "init",
    shorthand:  boolean,
    computed:  boolean,
    value:  Pattern,
    key:  Expression,
    method: boolean}):AssignmentProperty {
    return (o["type"] = "AssignmentProperty" && o) as AssignmentProperty
  }
  NESTED["AssignmentProperty"] = ["value","key"]; 
  export function ObjectPattern(o:{properties: (AssignmentProperty )[],}):ObjectPattern {
    return (o["type"] = "ObjectPattern" && o) as ObjectPattern
  }
  NESTED["ObjectPattern"] = ["properties"]; 
  export function ArrayPattern(o:{elements: (Pattern  )[],}):ArrayPattern {
    return (o["type"] = "ArrayPattern" && o) as ArrayPattern
  }
  NESTED["ArrayPattern"] = ["elements"]; 
  export function RestElement(o:{argument:  Pattern,}):RestElement {
    return (o["type"] = "RestElement" && o) as RestElement
  }
  NESTED["RestElement"] = ["argument"]; 
  export function AssignmentPattern(o:{right:  Expression,
    left:  Pattern,}):AssignmentPattern {
    return (o["type"] = "AssignmentPattern" && o) as AssignmentPattern
  }
  NESTED["AssignmentPattern"] = ["right","left"]; 
  export function ClassBody(o:{body: (MethodDefinition )[],}):ClassBody {
    return (o["type"] = "ClassBody" && o) as ClassBody
  }
  NESTED["ClassBody"] = ["body"]; 
  export function MethodDefinition(o:{kind:  "constructor" | "method" | "get" | "set",
    static:  boolean,
    computed:  boolean,
    key:  Expression,
    value:  FunctionExpression,}):MethodDefinition {
    return (o["type"] = "MethodDefinition" && o) as MethodDefinition
  }
  NESTED["MethodDefinition"] = ["key","value"]; 
  export function ClassDeclaration(o:{body:  ClassBody,
    superClass:  Expression,
    id:  Identifier,}):ClassDeclaration {
    return (o["type"] = "ClassDeclaration" && o) as ClassDeclaration
  }
  NESTED["ClassDeclaration"] = ["body","superClass","id"]; 
  export function ClassExpression(o:{body:  ClassBody,
    id:  Identifier,
    superClass:  Expression,}):ClassExpression {
    return (o["type"] = "ClassExpression" && o) as ClassExpression
  }
  NESTED["ClassExpression"] = ["body","id","superClass"]; 
  export function MetaProperty(o:{meta:  Identifier,
    property:  Identifier,}):MetaProperty {
    return (o["type"] = "MetaProperty" && o) as MetaProperty
  }
  NESTED["MetaProperty"] = ["meta","property"]; 
  export function ImportDeclaration(o:{specifiers: (ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier )[],
    source:  Literal,}):ImportDeclaration {
    return (o["type"] = "ImportDeclaration" && o) as ImportDeclaration
  }
  NESTED["ImportDeclaration"] = ["specifiers","source"]; 
  export function ImportSpecifier(o:{imported:  Identifier,
    local:  Identifier,}):ImportSpecifier {
    return (o["type"] = "ImportSpecifier" && o) as ImportSpecifier
  }
  NESTED["ImportSpecifier"] = ["imported","local"]; 
  export function ImportDefaultSpecifier(o:{local:  Identifier,}):ImportDefaultSpecifier {
    return (o["type"] = "ImportDefaultSpecifier" && o) as ImportDefaultSpecifier
  }
  NESTED["ImportDefaultSpecifier"] = ["local"]; 
  export function ImportNamespaceSpecifier(o:{local:  Identifier,}):ImportNamespaceSpecifier {
    return (o["type"] = "ImportNamespaceSpecifier" && o) as ImportNamespaceSpecifier
  }
  NESTED["ImportNamespaceSpecifier"] = ["local"]; 
  export function ExportNamedDeclaration(o:{specifiers: (ExportSpecifier )[],
    declaration:  Declaration,
    source:  Literal,}):ExportNamedDeclaration {
    return (o["type"] = "ExportNamedDeclaration" && o) as ExportNamedDeclaration
  }
  NESTED["ExportNamedDeclaration"] = ["specifiers","declaration","source"]; 
  export function ExportSpecifier(o:{local:  Identifier,
    exported:  Identifier,}):ExportSpecifier {
    return (o["type"] = "ExportSpecifier" && o) as ExportSpecifier
  }
  NESTED["ExportSpecifier"] = ["local","exported"]; 
  export function ExportDefaultDeclaration(o:{declaration:  Declaration | Expression,}):ExportDefaultDeclaration {
    return (o["type"] = "ExportDefaultDeclaration" && o) as ExportDefaultDeclaration
  }
  NESTED["ExportDefaultDeclaration"] = ["declaration"]; 
  export function ExportAllDeclaration(o:{source:  Literal,}):ExportAllDeclaration {
    return (o["type"] = "ExportAllDeclaration" && o) as ExportAllDeclaration
  }
  NESTED["ExportAllDeclaration"] = ["source"]; 
  export function isIdentifier(n:Node):n is Identifier { return n.type === "Identifier"; } 

  export function isLiteral(n:Node):n is Literal { return n.type === "Literal"; } 

  export function isProgram(n:Node):n is Program { return n.type === "Program"; } 

  export function isExpressionStatement(n:Node):n is ExpressionStatement { return n.type === "ExpressionStatement"; } 

  export function isBlockStatement(n:Node):n is BlockStatement { return n.type === "BlockStatement"; } 

  export function isEmptyStatement(n:Node):n is EmptyStatement { return n.type === "EmptyStatement"; } 

  export function isDebuggerStatement(n:Node):n is DebuggerStatement { return n.type === "DebuggerStatement"; } 

  export function isWithStatement(n:Node):n is WithStatement { return n.type === "WithStatement"; } 

  export function isReturnStatement(n:Node):n is ReturnStatement { return n.type === "ReturnStatement"; } 

  export function isLabeledStatement(n:Node):n is LabeledStatement { return n.type === "LabeledStatement"; } 

  export function isBreakStatement(n:Node):n is BreakStatement { return n.type === "BreakStatement"; } 

  export function isContinueStatement(n:Node):n is ContinueStatement { return n.type === "ContinueStatement"; } 

  export function isIfStatement(n:Node):n is IfStatement { return n.type === "IfStatement"; } 

  export function isSwitchStatement(n:Node):n is SwitchStatement { return n.type === "SwitchStatement"; } 

  export function isSwitchCase(n:Node):n is SwitchCase { return n.type === "SwitchCase"; } 

  export function isThrowStatement(n:Node):n is ThrowStatement { return n.type === "ThrowStatement"; } 

  export function isTryStatement(n:Node):n is TryStatement { return n.type === "TryStatement"; } 

  export function isCatchClause(n:Node):n is CatchClause { return n.type === "CatchClause"; } 

  export function isWhileStatement(n:Node):n is WhileStatement { return n.type === "WhileStatement"; } 

  export function isDoWhileStatement(n:Node):n is DoWhileStatement { return n.type === "DoWhileStatement"; } 

  export function isForStatement(n:Node):n is ForStatement { return n.type === "ForStatement"; } 

  export function isForInStatement(n:Node):n is ForInStatement { return n.type === "ForInStatement"; } 

  export function isFunctionDeclaration(n:Node):n is FunctionDeclaration { return n.type === "FunctionDeclaration"; } 

  export function isVariableDeclaration(n:Node):n is VariableDeclaration { return n.type === "VariableDeclaration"; } 

  export function isVariableDeclarator(n:Node):n is VariableDeclarator { return n.type === "VariableDeclarator"; } 

  export function isThisExpression(n:Node):n is ThisExpression { return n.type === "ThisExpression"; } 

  export function isArrayExpression(n:Node):n is ArrayExpression { return n.type === "ArrayExpression"; } 

  export function isObjectExpression(n:Node):n is ObjectExpression { return n.type === "ObjectExpression"; } 

  export function isProperty(n:Node):n is Property { return n.type === "Property"; } 

  export function isFunctionExpression(n:Node):n is FunctionExpression { return n.type === "FunctionExpression"; } 

  export function isUnaryExpression(n:Node):n is UnaryExpression { return n.type === "UnaryExpression"; } 

  export function isUpdateExpression(n:Node):n is UpdateExpression { return n.type === "UpdateExpression"; } 

  export function isBinaryExpression(n:Node):n is BinaryExpression { return n.type === "BinaryExpression"; } 

  export function isAssignmentExpression(n:Node):n is AssignmentExpression { return n.type === "AssignmentExpression"; } 

  export function isLogicalExpression(n:Node):n is LogicalExpression { return n.type === "LogicalExpression"; } 

  export function isMemberExpression(n:Node):n is MemberExpression { return n.type === "MemberExpression"; } 

  export function isConditionalExpression(n:Node):n is ConditionalExpression { return n.type === "ConditionalExpression"; } 

  export function isCallExpression(n:Node):n is CallExpression { return n.type === "CallExpression"; } 

  export function isNewExpression(n:Node):n is NewExpression { return n.type === "NewExpression"; } 

  export function isSequenceExpression(n:Node):n is SequenceExpression { return n.type === "SequenceExpression"; } 

  export function isForOfStatement(n:Node):n is ForOfStatement { return n.type === "ForOfStatement"; } 

  export function isSuper(n:Node):n is Super { return n.type === "Super"; } 

  export function isSpreadElement(n:Node):n is SpreadElement { return n.type === "SpreadElement"; } 

  export function isArrowFunctionExpression(n:Node):n is ArrowFunctionExpression { return n.type === "ArrowFunctionExpression"; } 

  export function isYieldExpression(n:Node):n is YieldExpression { return n.type === "YieldExpression"; } 

  export function isTemplateLiteral(n:Node):n is TemplateLiteral { return n.type === "TemplateLiteral"; } 

  export function isTaggedTemplateExpression(n:Node):n is TaggedTemplateExpression { return n.type === "TaggedTemplateExpression"; } 

  export function isTemplateElement(n:Node):n is TemplateElement { return n.type === "TemplateElement"; } 

  export function isAssignmentProperty(n:Node):n is AssignmentProperty { return n.type === "AssignmentProperty"; } 

  export function isObjectPattern(n:Node):n is ObjectPattern { return n.type === "ObjectPattern"; } 

  export function isArrayPattern(n:Node):n is ArrayPattern { return n.type === "ArrayPattern"; } 

  export function isRestElement(n:Node):n is RestElement { return n.type === "RestElement"; } 

  export function isAssignmentPattern(n:Node):n is AssignmentPattern { return n.type === "AssignmentPattern"; } 

  export function isClassBody(n:Node):n is ClassBody { return n.type === "ClassBody"; } 

  export function isMethodDefinition(n:Node):n is MethodDefinition { return n.type === "MethodDefinition"; } 

  export function isClassDeclaration(n:Node):n is ClassDeclaration { return n.type === "ClassDeclaration"; } 

  export function isClassExpression(n:Node):n is ClassExpression { return n.type === "ClassExpression"; } 

  export function isMetaProperty(n:Node):n is MetaProperty { return n.type === "MetaProperty"; } 

  export function isImportDeclaration(n:Node):n is ImportDeclaration { return n.type === "ImportDeclaration"; } 

  export function isImportSpecifier(n:Node):n is ImportSpecifier { return n.type === "ImportSpecifier"; } 

  export function isImportDefaultSpecifier(n:Node):n is ImportDefaultSpecifier { return n.type === "ImportDefaultSpecifier"; } 

  export function isImportNamespaceSpecifier(n:Node):n is ImportNamespaceSpecifier { return n.type === "ImportNamespaceSpecifier"; } 

  export function isExportNamedDeclaration(n:Node):n is ExportNamedDeclaration { return n.type === "ExportNamedDeclaration"; } 

  export function isExportSpecifier(n:Node):n is ExportSpecifier { return n.type === "ExportSpecifier"; } 

  export function isExportDefaultDeclaration(n:Node):n is ExportDefaultDeclaration { return n.type === "ExportDefaultDeclaration"; } 

  export function isExportAllDeclaration(n:Node):n is ExportAllDeclaration { return n.type === "ExportAllDeclaration"; } 

  export function isFunction(n:Node):n is BaseFunction { return n.type === "FunctionDeclaration" || n.type === "FunctionExpression" || n.type === "ArrowFunctionExpression" || n.type === "BaseFunction" }
}
