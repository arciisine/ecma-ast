/// <reference path="../node_modules/@types/lodash/index.d.ts" />
/// <reference path="../node_modules/@types/esprima/index.d.ts" />
declare module "ast" {
    export namespace AST {
        interface Node {
            type: string;
        }
        interface Statement extends Node {
        }
        interface ASTFunction extends Node {
        }
        interface EmptyStatement extends Statement {
            type: "EmptyStatement";
        }
        interface BlockStatement extends Statement {
            type: "BlockStatement";
            body: Statement[];
        }
        interface ExpressionStatement extends Statement {
            type: "ExpressionStatement";
            expression: Expression;
        }
        interface IfStatement extends Statement {
            type: "IfStatement";
            test: Expression;
            consequent: Statement;
            alternate?: Statement;
        }
        interface LabeledStatement extends Statement {
            type: "LabeledStatement";
            label: Identifier;
            body: Statement;
        }
        interface BreakStatement extends Statement {
            type: "BreakStatement";
            label?: Identifier;
        }
        interface ContinueStatement extends Statement {
            type: "ContinueStatement";
            label?: Identifier;
        }
        interface WithStatement extends Statement {
            type: "WithStatement";
            object: Expression;
            body: Statement;
        }
        interface SwitchStatement extends Statement {
            type: "SwitchStatement";
            discriminant: Expression;
            cases: SwitchCase[];
            lexical: boolean;
        }
        interface ReturnStatement extends Statement {
            type: "ReturnStatement";
            argument?: Expression;
        }
        interface ThrowStatement extends Statement {
            type: "ThrowStatement";
            argument: Expression;
        }
        interface TryStatement extends Statement {
            type: "TryStatement";
            block: BlockStatement;
            handler?: CatchClause;
            guardedHandlers?: CatchClause[];
            finalizer?: BlockStatement;
        }
        interface WhileStatement extends Statement {
            type: "WhileStatement";
            test: Expression;
            body: Statement;
        }
        interface DoWhileStatement extends Statement {
            type: "DoWhileStatement";
            body: Statement;
            test: Expression;
        }
        interface ForStatement extends Statement {
            type: "ForStatement";
            init?: VariableDeclaration | Expression;
            test?: Expression;
            update?: Expression;
            body: Statement;
        }
        interface ForInStatement extends Statement {
            type: "ForInStatement";
            left: VariableDeclaration | Expression;
            right: Expression;
            body: Statement;
            each: boolean;
        }
        interface ForOfStatement extends Statement {
            type: "ForOfStatement";
            left: VariableDeclaration | Expression;
            right: Expression;
            body: Statement;
        }
        interface LetStatement extends Statement {
            type: "LetStatement";
            head: VariableDeclarator[];
            body: Statement;
        }
        interface DebuggerStatement extends Statement {
            type: "DebuggerStatement";
        }
        interface Declaration extends Statement {
        }
        interface FunctionDeclaration extends ASTFunction, Declaration {
            type: "FunctionDeclaration";
            id: Identifier;
            params: Pattern[];
            defaults: Expression[];
            rest?: Identifier;
            body: BlockStatement | Expression;
            generator: boolean;
            expression: boolean;
        }
        interface VariableDeclaration extends Declaration {
            type: "VariableDeclaration";
            declarations: VariableDeclarator[];
            kind: "var" | "let" | "const";
        }
        interface VariableDeclarator extends Node {
            type: "VariableDeclarator";
            id: Pattern;
            init?: Expression;
        }
        interface Expression extends Node, Pattern {
        }
        interface ThisExpression extends Expression {
            type: "ThisExpression";
        }
        interface ArrayExpression extends Expression {
            type: "ArrayExpression";
            elements?: Expression[];
        }
        interface ObjectExpression extends Expression {
            type: "ObjectExpression";
            properties: Property[];
        }
        interface Property extends Node {
            type: "Property";
            key: Literal | Identifier;
            value: Expression;
            kind: "init" | "get" | "set";
        }
        interface FunctionExpression extends ASTFunction, Expression {
            type: "FunctionExpression";
            id?: Identifier;
            params: Pattern[];
            defaults: Expression[];
            rest?: Identifier;
            body: BlockStatement | Expression;
            generator: boolean;
            expression: boolean;
        }
        interface ArrowExpression extends ASTFunction, Expression {
            type: "ArrowExpression";
            params: Pattern[];
            defaults: Expression[];
            rest?: Identifier;
            body: BlockStatement | Expression;
            generator: boolean;
            expression: boolean;
        }
        interface SequenceExpression extends Expression {
            type: "SequenceExpression";
            expressions: Expression[];
        }
        interface UnaryExpression extends Expression {
            type: "UnaryExpression";
            operator: UnaryOperator;
            prefix: boolean;
            argument: Expression;
        }
        interface BinaryExpression extends Expression {
            type: "BinaryExpression";
            operator: BinaryOperator;
            left: Expression;
            right: Expression;
        }
        interface AssignmentExpression extends Expression {
            type: "AssignmentExpression";
            operator: AssignmentOperator;
            left: Pattern;
            right: Expression;
        }
        interface UpdateExpression extends Expression {
            type: "UpdateExpression";
            operator: UpdateOperator;
            argument: Expression;
            prefix: boolean;
        }
        interface LogicalExpression extends Expression {
            type: "LogicalExpression";
            operator: LogicalOperator;
            left: Expression;
            right: Expression;
        }
        interface ConditionalExpression extends Expression {
            type: "ConditionalExpression";
            test: Expression;
            alternate: Expression;
            consequent: Expression;
        }
        interface NewExpression extends Expression {
            type: "NewExpression";
            callee: Expression;
            arguments: Expression[];
        }
        interface CallExpression extends Expression {
            type: "CallExpression";
            callee: Expression | Identifier;
            arguments: Expression[];
        }
        interface MemberExpression extends Expression {
            type: "MemberExpression";
            object: Expression;
            property: Identifier | Expression;
            computed: boolean;
        }
        interface YieldExpression extends Expression {
            type: "YieldExpression";
            argument?: Expression;
        }
        interface ComprehensionExpression extends Expression {
            type: "ComprehensionExpression";
            body: Expression;
            blocks: ComprehensionBlock | ComprehensionIf[];
            filter?: Expression;
        }
        interface GeneratorExpression extends Expression {
            type: "GeneratorExpression";
            body: Expression;
            blocks: ComprehensionBlock | ComprehensionIf[];
            filter?: Expression;
        }
        interface GraphExpression extends Expression {
            type: "GraphExpression";
            index: number;
            expression: Literal;
        }
        interface GraphIndexExpression extends Expression {
            type: "GraphIndexExpression";
            index: number;
        }
        interface LetExpression extends Expression {
            type: "LetExpression";
            head: VariableDeclarator[];
            body: Expression;
        }
        interface Pattern extends Node {
        }
        interface ObjectPattern extends Pattern {
            type: "ObjectPattern";
            properties: {
                key: Literal | Identifier;
                value: Pattern;
            }[];
        }
        interface ArrayPattern extends Pattern {
            type: "ArrayPattern";
            elements?: Pattern[];
        }
        interface SwitchCase extends Node {
            type: "SwitchCase";
            test?: Expression;
            consequent: Statement[];
        }
        interface CatchClause extends Node {
            type: "CatchClause";
            param: Pattern;
            guard?: Expression;
            body: BlockStatement;
        }
        interface ComprehensionBlock extends Node {
            type: "ComprehensionBlock";
            left: Pattern;
            right: Expression;
            each: boolean;
        }
        interface ComprehensionIf extends Node {
            type: "ComprehensionIf";
            test: Expression;
        }
        interface Identifier extends Expression {
            type: "Identifier";
            name: string;
        }
        interface Literal extends Expression {
            type: "Literal";
            value?: string | boolean | number | RegExp;
        }
        enum UnaryOperator {
            "-" = 0,
            "+" = 1,
            "!" = 2,
            "~" = 3,
            "typeof" = 4,
            "void" = 5,
            "delete" = 6,
        }
        enum BinaryOperator {
            "==" = 0,
            "!=" = 1,
            "===" = 2,
            "!==" = 3,
            "<" = 4,
            "<=" = 5,
            ">" = 6,
            ">=" = 7,
            "<<" = 8,
            ">>" = 9,
            ">>>" = 10,
            "+" = 11,
            "-" = 12,
            "*" = 13,
            "/" = 14,
            "%" = 15,
            "," = 16,
            "^" = 17,
            "&" = 18,
            "in" = 19,
            "instanceof" = 20,
            ".." = 21,
        }
        enum LogicalOperator {
            ",," = 0,
            "&&" = 1,
        }
        enum AssignmentOperator {
            "=" = 0,
            "+=" = 1,
            "-=" = 2,
            "*=" = 3,
            "/=" = 4,
            "%=" = 5,
            "<<=" = 6,
            ">>=" = 7,
            ">>>=" = 8,
            ",=" = 9,
            "^=" = 10,
            "&=" = 11,
        }
        enum UpdateOperator {
            "++" = 0,
            "--" = 1,
        }
    }
}
declare module "escodegen/lib" {
    var _default: any;
    export default _default;
}
declare module "escodegen/index" {
    import { AST } from "ast";
    export let generate: (node: AST.Node) => string;
}
declare module "macro" {
    import { AST } from "ast";
    export class Macro {
        static genSymbol(): string;
        static Id: (name?: string) => AST.Identifier;
        static Literal: (value: any) => AST.Literal;
        static Block: (...body: any[]) => AST.BlockStatement;
        static Expr: (n: AST.Node) => AST.ExpressionStatement;
        static Continue: (label?: AST.Identifier) => AST.ContinueStatement;
        static Noop: () => AST.Node;
        static Return: (e: AST.Expression) => AST.ReturnStatement;
        static Yield: (e: AST.Expression, delegate?: boolean) => AST.YieldExpression;
        static Array: (size?: number) => AST.ArrayPattern;
        static Throw: (e: AST.Expression) => AST.ThrowStatement;
        static Call: (src: AST.Identifier | AST.Expression, ...args: any[]) => AST.CallExpression;
        static Assign: (id: AST.Identifier, expr: AST.Expression, op?: string) => AST.AssignmentExpression;
        static GetProperty: (id: AST.Identifier, prop: AST.Identifier | string) => AST.MemberExpression;
        static Vars: (...args: any[]) => AST.VariableDeclaration;
        static BinaryExpr: (id: AST.Identifier, op: string, val: AST.Expression) => AST.BinaryExpression;
        static UnaryExpr: (op: string, val: AST.Expression) => AST.UnaryExpression;
        static Negate: (val: AST.Expression) => AST.UnaryExpression;
        static Increment: (id: AST.Identifier, increment?: number) => AST.AssignmentExpression;
        static Labeled: (id: AST.Identifier, body: AST.Statement) => AST.LabeledStatement;
        static ForLoop: (id: AST.Identifier, init: AST.Expression, upto: AST.Expression, body: AST.Statement[], increment?: number) => AST.ForStatement;
        static TryCatchFinally: (t: AST.Node[], c?: AST.Node[], f?: AST.Node[]) => AST.TryStatement;
        static Func: (id: AST.Identifier, params: AST.Pattern[], body: AST.Node[], generator?: boolean) => AST.FunctionDeclaration;
        static IfThen: (test: AST.Expression, body: AST.Node[], elseBody?: AST.Node[]) => AST.IfStatement;
    }
}
declare module "transform" {
    import { AST } from "ast";
    export interface Transformer {
        <T extends AST.Node>(node: T): T;
    }
    export interface Visitor {
        process: Transformer;
    }
    export class Transform {
        static NESTED_PROPERTIES: string[];
        static visit<T extends AST.Node>(visitor: Visitor, node: T, parent?: AST.Node | [AST.Node], key?: string | number): T;
        static parse(fn: Function | string): AST.FunctionExpression;
        static compile(node: AST.FunctionExpression, globals: any): Function;
        static visitor(conf: {
            [key: string]: Transformer;
        }): {
            process: <T extends AST.Node>(node: T) => AST.Node;
        };
        static rewrite(fn: Function, visitor: Visitor, globals?: any): Function;
    }
}
declare module "index" {
    export * from "transform";
    export * from "ast";
    export * from "macro";
}
