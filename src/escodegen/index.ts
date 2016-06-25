import {AST} from '../ast';
import escodegen from './lib';
export let generate:(node:AST.Node)=>string = escodegen['generate']