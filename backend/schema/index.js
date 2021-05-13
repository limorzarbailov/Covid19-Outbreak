"use strict";
exports.__esModule = true;
exports.schema = void 0;
var graphql_1 = require("graphql");
var entity_1 = require("../types/entity");
var mapEntity_1 = require("../types/mapEntity");
var schemaType_1 = require("../types/schemaType");
exports.schema = graphql_1.buildSchema("\n" + entity_1.entityType + "\n" + entity_1.entityInput + "\n" + mapEntity_1.mapEntityType + "\n" + mapEntity_1.mapEntityInput + "\n" + schemaType_1.schemaType + "\n");
