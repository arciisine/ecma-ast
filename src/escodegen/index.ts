import * as AST from '../types';
import escodegen from './lib';
export let generate:(node:AST.Node)=>string = escodegen['generate']