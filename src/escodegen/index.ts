import {AST} from '../ast';
import escodegen from './lib';

export interface EscodegenOptionsFormatIndent {
  style?: string;
  base?: number;
  adjustMultilineComment?: boolean;
};

export interface EscodegenOptionsMozilla {
  comprehensionExpressionStartsWithAssignment?: boolean;
  starlessGenerator?: boolean;
}

export interface EscodegenOptionsFormat {
  indent?: EscodegenOptionsFormatIndent
  newline?: string;
  space?: string;
  json?: boolean;
  renumber?: boolean;
  hexadecimal?: boolean;
  quotes?: 'single'|'double';
  escapeless?: boolean;
  compact?: boolean;
  parentheses?: boolean;
  semicolons?: boolean;
  safeConcatenation?: boolean;
  preserveBlankLines?: boolean;
}
export interface EscodegenOptions {
  indent?: boolean;
  base?: string;
  parse?: (node:AST.Node)=>string;
  comment?: boolean;
  format?:EscodegenOptionsFormat;
  moz?: EscodegenOptionsMozilla;
  directive?: boolean;
  raw?: boolean;
  verbatim?: string;
  sourceMap?: any;
  sourceMapRoot?: any;
  sourceMapWithCode?: any;
  sourceCode?: any;  
};

export let generate:(node:AST.Node, opts?:EscodegenOptions)=>string = escodegen['generate']