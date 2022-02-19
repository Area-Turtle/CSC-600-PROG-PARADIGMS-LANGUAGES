import ts, { getOriginalNode, idText, SyntaxKind } from "typescript";
import { inspect } from "util";


/* ************************************************************************** */
/* Arithmetic Expression */
/* ************************************************************************** */

namespace ArithExpr {
    export enum Operator { PLUS, MINUS, TIMES, DIVIDE };
    export enum _ArithExpr { NUMBER, BINARY_OP, PARENS };
    export type ArithExpr =
        {tag: _ArithExpr.NUMBER, literal: number}
      | {tag: _ArithExpr.BINARY_OP, left: ArithExpr, op: Operator, right: ArithExpr}
      | {tag: _ArithExpr.PARENS, expr: ArithExpr};
    

    export function Number(num: number): ArithExpr {
        return {tag: _ArithExpr.NUMBER, literal: num};
    }


    export function BinaryOp(left: ArithExpr, op: Operator, right: ArithExpr): ArithExpr {
        return {tag: _ArithExpr.BINARY_OP, left: left, op: op, right: right};
    }


    export function Parens(expr: ArithExpr): ArithExpr {
        return {tag: _ArithExpr.PARENS, expr: expr};
    }

    
    export function height(expr: ArithExpr): number {
        /* Compare with height for tree. */
        switch (expr.tag) {
            case _ArithExpr.NUMBER: {
                return 1;
            }
            case _ArithExpr.BINARY_OP: {
                return 1 + Math.max(height(expr.left), height(expr.right));
            }
            case _ArithExpr.PARENS: {
                return 1 + height(expr.expr);
            }
        }
    }
    
    
    export function weirdEvaluator(expr: ArithExpr): number {
        switch (expr.tag) {
            case _ArithExpr.NUMBER: {
                return expr.literal;
            }
            case _ArithExpr.BINARY_OP: {
                switch (expr.op) {
                    case Operator.PLUS: {
                        /* Syntax for "+" becomes "-" */
                        return weirdEvaluator(expr.left) - weirdEvaluator(expr.right);
                    }
                    case Operator.MINUS: {
                        /* Syntax for "-" becomes "+" */
                        return weirdEvaluator(expr.left) + weirdEvaluator(expr.right);
                    }
                    case Operator.TIMES: {
                        /* Syntax for "*" becomes "right expression" */
                        return weirdEvaluator(expr.right);
                    }
                    case Operator.DIVIDE: {
                        /* Syntax for "/" becomes "left expression" */
                        return weirdEvaluator(expr.left);
                    }
                }
            }
        }
    }
    
    
    export function evaluator(expr: ArithExpr): number {
        switch (expr.tag) {
            case _ArithExpr.NUMBER: {
                return expr.literal;
            }
            case _ArithExpr.BINARY_OP: {
                switch (expr.op) {
                    case Operator.PLUS: {
                        return evaluator(expr.left) + evaluator(expr.right);
                    }
                    case Operator.MINUS: {
                        return evaluator(expr.left) - evaluator(expr.right);
                    }
                    case Operator.TIMES: {
                        return evaluator(expr.left) * evaluator(expr.right);
                    }
                    case Operator.DIVIDE: {
                        return evaluator(expr.left) / evaluator(expr.right);
                    }
                }
            }
        }
    }
}


/* ************************************************************************** */
/* Functions Expressions, i.e., Untyped Lambda Calculus */
/* ************************************************************************** */

namespace FuncExpr {
    export enum _FuncExpr { VARIABLE, FUNCTION, CALL, PARENS };
    export type FuncExpr =
        {tag: _FuncExpr.VARIABLE, id: string}
      | {tag: _FuncExpr.FUNCTION, id: string, body: FuncExpr}
      | {tag: _FuncExpr.CALL, func: FuncExpr, arg: FuncExpr}
      | {tag: _FuncExpr.PARENS, expr: FuncExpr};
    
    
    export function Variable(id: string): FuncExpr {
        return {tag: _FuncExpr.VARIABLE, id: id};
    }


    export function Function(id: string, body: FuncExpr): FuncExpr {
        return {tag: _FuncExpr.FUNCTION, id: id, body: body};
    }


    export function Call(func: FuncExpr, arg: FuncExpr): FuncExpr {
        return {tag: _FuncExpr.CALL, func: func, arg: arg};
    }


    export function Parens(expr: FuncExpr): FuncExpr {
        return {tag: _FuncExpr.PARENS, expr: expr};
    }


    export function height(expr: FuncExpr): number {
        /* Compare with height for tree. */
        switch (expr.tag) {
            case _FuncExpr.VARIABLE: {
                return 1;
            }
            case _FuncExpr.FUNCTION: {
                return 1 + height(expr.body);
            }
            case _FuncExpr.CALL: {
                return 1 + Math.max(height(expr.func), height(expr.arg));
            }
            case _FuncExpr.PARENS: {
                return 1 + height(expr.expr);
            }
        }
    }


    export function substitute(expr: FuncExpr, id: string, val: FuncExpr): FuncExpr {
        switch (expr.tag) {
            case _FuncExpr.VARIABLE: {
                if (id == expr.id) {
                    return val;
                } else {
                    return expr;
                }
            }
            case _FuncExpr.FUNCTION: {
                if (id == expr.id) {
                    return expr;
                } else {
                    return Function(expr.id, substitute(expr.body, id, val));
                }
            }
            case _FuncExpr.CALL: {
                return Call(substitute(expr.func, id, val), substitute(expr.arg, id, val));
            }
            case _FuncExpr.PARENS: {
                return Parens(substitute(expr.expr, id, val));
            }
        }
    }


    export function interpret(expr: FuncExpr): FuncExpr {
        /* A simple interpreter based on substitution-based. */
        switch (expr.tag) {
            case _FuncExpr.VARIABLE: {
                throw Error(`Evaluation resulted in variable ${expr.id} ...`);
            }
            case _FuncExpr.FUNCTION: {
                return expr;
            }
            case _FuncExpr.CALL: {
                const func = interpret(expr);
                switch (func.tag) {
                    case _FuncExpr.FUNCTION: {
                        return substitute(func.body, func.id, interpret(expr));
                    }
                    default: {
                        throw Error(`Attempting to apply non-function ${func.tag}`);
                    }
                }
            }
            case _FuncExpr.PARENS: {
                return interpret(expr.expr);
            }
        }
    }
}


/* ************************************************************************** */
/* TypeScript AST for Functions */
/* ************************************************************************** */

namespace lambdaTS {
    export function parse(source: string): ts.Node {
        const sourceFile = ts.createSourceFile("foobar.ts", source, ts.ScriptTarget.ES2015, true, ts.ScriptKind.TS);
        return sourceFile.statements[0];
    }
    

    export function height(node: ts.Node): number {
        /* Compare with height for tree. */
        switch (node.kind) {
            case ts.SyntaxKind.Identifier: {
                return 1;
            }
            case ts.SyntaxKind.ArrowFunction: {
                const arr = node as ts.ArrowFunction;
                return 1 + height(arr.body);
            }
            case ts.SyntaxKind.CallExpression: {
                const call = node as ts.CallExpression;
                return 1 + Math.max(height(call.expression),
                                    /* Problem: list of arguments as opposed to 1 argument.
                                     * Solution: use map and reduce! */
                                    call.arguments.map(height).reduce((x: number, y: number) => Math.max(x, y), 0));
            }
            case ts.SyntaxKind.ParenthesizedExpression: {
                const parens = node as ts.ParenthesizedExpression;
                return 1 + height(parens.expression);
            }
        }
    }


    export function environmentInterpret(node: ts.Node): number|ts.ArrowFunction {
        function go(env, node: ts.Node): number|ts.ArrowFunction {
            switch (node.kind) {
                case ts.SyntaxKind.Identifier: {
                    const id = node as ts.Identifier;
                    return env[id.text];
                }
                case ts.SyntaxKind.ArrowFunction: {
                    const arr = node as ts.ArrowFunction;
                    return arr;
                }
                case ts.SyntaxKind.CallExpression: {
                    const call = node as ts.CallExpression;
                    const func = call.expression as unknown as ts.ArrowFunction;
                    const params = func.parameters.map((param) => param.name);
                    const args = call.arguments.map((arg) => go(env, arg));
                    // TODO(deh): extend env with params -> args
                    return func;
                }
                case ts.SyntaxKind.ParenthesizedExpression: {
                    const parens = node as ts.ParenthesizedExpression;
                    return go(env, parens.expression);
                }
            }
        }
        return go({}, node);
    }


    export function emit(node: ts.Node): string {
        switch (node.kind) {
            case ts.SyntaxKind.Identifier: {
                const id = node as ts.Identifier;
                return id.text;
            }
            case ts.SyntaxKind.ArrowFunction: {
                const arr = node as ts.ArrowFunction;
                return `(${arr.parameters.map((param) => param.name)}) => ${emit(arr.body)}`;
            }
            case ts.SyntaxKind.CallExpression: {
                const call = node as ts.CallExpression;
                return `${emit(call.expression)}(${call.arguments.map((arg) => emit(arg)).join(", ")})`;
            }
            case ts.SyntaxKind.ParenthesizedExpression: {
                const parens = node as ts.ParenthesizedExpression;
                return `(${emit(parens.expression)})`;
            }
        }
    }
}


/* ************************************************************************** */
/* TypeScript AST for Numbers + Functions */
/* ************************************************************************** */

namespace numericLambdaTS {
    export function parse(source: string): ts.Node {
        const sourceFile = ts.createSourceFile("foobar.ts", source, ts.ScriptTarget.ES2015, true, ts.ScriptKind.TS);
        return sourceFile.statements[0];
    }
    

    export function height(node: ts.Node): number {
        /* Compare with height for tree. */
        switch (node.kind) {
            case ts.SyntaxKind.NumericLiteral: {
                return 1;
            }
            case ts.SyntaxKind.BinaryExpression: {
                const binOp = node as ts.BinaryExpression;
                return 1 + Math.max(height(binOp.left), height(binOp.right));
            }
            case ts.SyntaxKind.ParenthesizedExpression: {
                const parens = node as ts.ParenthesizedExpression;
                return 1 + height(parens.expression);
            }
            case ts.SyntaxKind.Identifier: {
                return 1;
            }
            case ts.SyntaxKind.ArrowFunction: {
                const arr = node as ts.ArrowFunction;
                return 1 + height(arr.body);
            }
            case ts.SyntaxKind.CallExpression: {
                const call = node as ts.CallExpression;
                return 1 + Math.max(height(call.expression),
                                    /* Problem: list of arguments as opposed to 1 argument.
                                     * Solution: use map and reduce! */
                                    call.arguments.map(height).reduce((x: number, y: number) => Math.max(x, y), 0));
            }
        }
    }


    export function emit(node: ts.Node): string {
        switch (node.kind) {
            case ts.SyntaxKind.NumericLiteral: {
                const num = node as ts.NumericLiteral;
                return num.text;
            }
            case ts.SyntaxKind.BinaryExpression: {
                const binOp = node as ts.BinaryExpression;
                return `${emit(binOp.left)} ${binOp.operatorToken.getText()} ${emit(binOp.right)}`;
            }
            case ts.SyntaxKind.ParenthesizedExpression: {
                const parens = node as ts.ParenthesizedExpression;
                return `(${emit(parens.expression)})`;
            }
            case ts.SyntaxKind.Identifier: {
                const id = node as ts.Identifier;
                return id.text;
            }
            case ts.SyntaxKind.ArrowFunction: {
                const arr = node as ts.ArrowFunction;
                return `(${arr.parameters.map((param) => param.name)}) => ${emit(arr.body)}`;
            }
            case ts.SyntaxKind.CallExpression: {
                const call = node as ts.CallExpression;
                return `${emit(call.expression)}(${call.arguments.map((arg) => emit(arg)).join(", ")})`;
            }
        }
    }


    export function interpret(node: ts.Node): number|ts.ArrowFunction {
        /* A simple interpreter based on substitution-based. */
        function go(env, node: ts.Node): number|ts.ArrowFunction {
            switch (node.kind) {
                case ts.SyntaxKind.NumericLiteral: {
                    const num = node as ts.NumericLiteral;
                    return parseInt(num.text);
                }
                case ts.SyntaxKind.BinaryExpression: {
                    const binOp = node as ts.BinaryExpression;
                    const left = go(env, binOp.left) as number;
                    const right = go(env, binOp.right) as number;
                    switch (binOp.operatorToken.kind) {
                        case ts.SyntaxKind.PlusToken: {
                            return left + right;
                        }
                        case ts.SyntaxKind.MinusToken: {
                            return left - right;
                        }
                        case ts.SyntaxKind.AsteriskToken: {
                            return left * right;
                        }
                        case ts.SyntaxKind.SlashToken: {
                            return left / right;
                        }
                    }
                }
                case ts.SyntaxKind.ParenthesizedExpression: {
                    const parens = node as ts.ParenthesizedExpression;
                    return go(env, parens.expression);
                }
                case ts.SyntaxKind.Identifier: {
                    const id = node as ts.Identifier;
                    return env[id.text];
                }
                case ts.SyntaxKind.ArrowFunction: {
                    const arr = node as ts.ArrowFunction;
                    return arr;
                }
                case ts.SyntaxKind.CallExpression: {
                    const call = node as ts.CallExpression;
                    const func = call.expression as unknown as ts.ArrowFunction;
                    const params = func.parameters.map((param) => param.name);
                    const args = call.arguments.map((arg) => go(env, arg));
                    // TODO(deh): extend env with params -> args
                    return func;
                }
            }
        }

        return go({}, node);
    }
}



/* ************************************************************************** */
/* Examples */
/* ************************************************************************** */

export const source1 = `
const lt0 = (x: (y: number, z: number) => (a: number) => [number, number]) => {
    return x < 0;
}
`;


export const source2 = `
const foobar = 1;

const lt0 = (x: number) => {
    return x < 0;
}

const foobar = (x) => {
    if (x < 0) {
        return x;
    }
    else {
      0 + 0;
      1 + 1;
    }
    let y = [1, 2];
    let z = (x) => {return x};
    y[1] = 3;
    const a = {prop1: 1, prop2: 2};
    const b = a.prop1 + a.prop2;
    return lt0(y[0]);
}
`;


export const source3 = `
const length = (ls: List): number => {
    switch (ls.tag) {
        case _List.NIL:
            return 0;
        case _List.CONS:
            return 1 + length(tail(ls));
    }
}
`



/* ************************************************************************** */
/* Languages */
/* ************************************************************************** */


export const numericTSSyntax = [
    /* Numerics */
    ts.SyntaxKind.NumericLiteral,
    ts.SyntaxKind.BinaryExpression,
    ts.SyntaxKind.ParenthesizedExpression
];


export const numericLambdaTSSyntax = [
    /* Numerics */
    ts.SyntaxKind.NumericLiteral,
    ts.SyntaxKind.BinaryExpression,
    ts.SyntaxKind.ParenthesizedExpression,

    /* Functions */
    ts.SyntaxKind.Identifier,
    ts.SyntaxKind.ArrowFunction,
    ts.SyntaxKind.CallExpression
];


export const numericLambdaSugarTSSyntax = [
    /* Numerics ("syntactic sugar") */
    ts.SyntaxKind.NumericLiteral,
    ts.SyntaxKind.BinaryExpression,
    ts.SyntaxKind.ParenthesizedExpression,

    /* Functions */
    ts.SyntaxKind.Identifier,
    ts.SyntaxKind.ArrowFunction,
    ts.SyntaxKind.CallExpression,
    ts.SyntaxKind.ReturnStatement,
    
    /* Syntactic Sugar: Let bindings */
    ts.SyntaxKind.VariableStatement,
    ts.SyntaxKind.Block,

    /* Tuples ("syntactic sugar") */
    ts.SyntaxKind.ArrayLiteralExpression,
    ts.SyntaxKind.ElementAccessExpression
];


export const typesNumericLambdaSugarTSSyntax = [
    /* Types */
    ts.SyntaxKind.NumberKeyword,
    ts.SyntaxKind.FunctionType,
    ts.SyntaxKind.TupleType,

    /* Numerics ("syntactic sugar") */
    ts.SyntaxKind.NumericLiteral,
    ts.SyntaxKind.BinaryExpression,
    ts.SyntaxKind.ParenthesizedExpression,

    /* Functions */
    ts.SyntaxKind.Identifier,
    ts.SyntaxKind.ArrowFunction,
    ts.SyntaxKind.CallExpression,
    ts.SyntaxKind.ReturnStatement,
    
    /* Syntactic Sugar: Let bindings */
    ts.SyntaxKind.VariableStatement,
    ts.SyntaxKind.Block,

    /* Tuples ("syntactic sugar") */
    ts.SyntaxKind.ArrayLiteralExpression,
    ts.SyntaxKind.ElementAccessExpression
];


export const typesNumericLambdaSugarIfTSSyntax = [
    /* Types */
    ts.SyntaxKind.NumberKeyword,
    ts.SyntaxKind.FunctionType,
    ts.SyntaxKind.TupleType,

    /* Numerics ("syntactic sugar") */
    ts.SyntaxKind.NumericLiteral,
    ts.SyntaxKind.BinaryExpression,
    ts.SyntaxKind.ParenthesizedExpression,

    /* Functions */
    ts.SyntaxKind.Identifier,
    ts.SyntaxKind.ArrowFunction,
    ts.SyntaxKind.CallExpression,
    ts.SyntaxKind.ReturnStatement,
    
    /* Syntactic Sugar: Let Bindings */
    ts.SyntaxKind.VariableStatement,
    ts.SyntaxKind.Block,

    /* Tuples ("syntactic sugar") */
    ts.SyntaxKind.ArrayLiteralExpression,
    ts.SyntaxKind.ElementAccessExpression,

    /* Case-Analysis ("syntactic sugar") */
    ts.SyntaxKind.IfStatement
];


export const typesNumericLambdaSugarIfStateTSSyntax = [
    /* Types */
    ts.SyntaxKind.NumberKeyword,
    ts.SyntaxKind.FunctionType,
    ts.SyntaxKind.TupleType,

    /* Numerics */
    ts.SyntaxKind.NumericLiteral,
    ts.SyntaxKind.BinaryExpression,
    ts.SyntaxKind.ParenthesizedExpression,

    /* Functions */
    ts.SyntaxKind.Identifier,
    ts.SyntaxKind.ArrowFunction,
    ts.SyntaxKind.CallExpression,
    ts.SyntaxKind.ReturnStatement,
    
    /* Syntactic Sugar: Let Bindings */
    ts.SyntaxKind.VariableStatement,
    ts.SyntaxKind.Block,

    /* Tuples ("syntactic sugar") */
    ts.SyntaxKind.ArrayLiteralExpression,
    ts.SyntaxKind.ElementAccessExpression,

    /* Case-Analysis ("syntactic sugar") */
    ts.SyntaxKind.IfStatement,

    /* Side-Effects */
    ts.SyntaxKind.ExpressionStatement
];


export const ultimateLambdaTS = [
    /* Types */
    ts.SyntaxKind.NumberKeyword,
    ts.SyntaxKind.FunctionType,
    ts.SyntaxKind.TupleType,
    ts.SyntaxKind.AnyKeyword,
    ts.SyntaxKind.StringKeyword,
    ts.SyntaxKind.TypeReference,

    /* Numerics */
    ts.SyntaxKind.NumericLiteral,
    ts.SyntaxKind.BinaryExpression,
    ts.SyntaxKind.ParenthesizedExpression,

    /* Strings */
    ts.SyntaxKind.StringLiteral,

    /* Functions */
    ts.SyntaxKind.Identifier,
    ts.SyntaxKind.ArrowFunction,
    ts.SyntaxKind.CallExpression,
    ts.SyntaxKind.ReturnStatement,
    
    /* Syntactic Sugar: Let Bindings */
    ts.SyntaxKind.VariableStatement,
    ts.SyntaxKind.Block,

    /* Tuples ("syntactic sugar") */
    ts.SyntaxKind.ArrayLiteralExpression,
    ts.SyntaxKind.ElementAccessExpression,

    /* Dictionaries */
    ts.SyntaxKind.ObjectLiteralExpression,
    ts.SyntaxKind.PropertyAccessExpression,

    /* Case-Analysis ("syntactic sugar") */
    ts.SyntaxKind.IfStatement,

    /* Side-Effects */
    ts.SyntaxKind.ExpressionStatement,
    ts.SyntaxKind.ThrowStatement
];


/* ************************************************************************** */
/* AST Helper */
/* ************************************************************************** */

export const syntaxKind = Object.keys(ts.SyntaxKind).map(key => ts.SyntaxKind[key]).filter(value => typeof value === 'string') as string[];
