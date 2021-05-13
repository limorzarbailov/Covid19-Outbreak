"use strict";
exports.__esModule = true;
exports.mapEntityInput = exports.mapEntityType = void 0;
exports.mapEntityType = "type MapEntity{\n    _id: ID\n    entity: Entity\n    actionType: Int\n  }";
exports.mapEntityInput = "input MapEntityInput{\n    entity: EntityInput\n    actionType: Int\n  }";
