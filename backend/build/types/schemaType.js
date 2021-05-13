"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaType = void 0;
var query_1 = require("../query/query");
var mutation_1 = require("../mutation/mutation");
exports.schemaType = "schema{\n    query: RootQuery\n    mutation: RootMutation   \n    \n  }\n    " + query_1.RootQuery + "\n    " + mutation_1.rootMutation + "\n  ";
