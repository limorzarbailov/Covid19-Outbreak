"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAP_ENTITIES = void 0;
var mongoose_1 = require("mongoose");
var MAP_ENTITY_SCHEMA = new mongoose_1.Schema({
    entity: {
        type: Object, required: true
    },
    actionType: {
        type: Number, required: true
    }
});
exports.MAP_ENTITIES = mongoose_1.model('entities', MAP_ENTITY_SCHEMA);
