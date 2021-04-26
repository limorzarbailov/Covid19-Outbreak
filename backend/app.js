"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var index_js_1 = require("./node_modules/express-graphql/index.js");
var graphql_1 = require("graphql");
var mongoose = require("mongoose");
var mapEntities_1 = require("./model/mapEntities");
var APP = express();
var DB_URI = 'mongodb://limorzarbailov:limor8527@cluster0-shard-00-00.nkv8q.mongodb.net:27017,cluster0-shard-00-01.nkv8q.mongodb.net:27017,cluster0-shard-00-02.nkv8q.mongodb.net:27017/CoronaOutbreak?ssl=true&replicaSet=atlas-1404zz-shard-0&authSource=admin&retryWrites=true&w=majority';
APP.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});
APP.use('/graphql', index_js_1.graphqlHTTP({
    schema: graphql_1.buildSchema("\n    type Entity{\n      position: String\n      saved: Boolean\n    }\n    input EntityInput{\n      position: String\n      saved: Boolean\n    }\n\n    type MapEntity{\n      _id: ID\n      entity: Entity\n      actionType: Int\n    }\n\n    input MapEntityInput{\n      entity: EntityInput\n      actionType: Int\n    }\n  \n  \n    type RootQuery{\n      allMapEntities: [MapEntity]\n     \n    }\n\n    type RootMutation{  \n      createMapEntities(mapEntityInput: [MapEntityInput]):String\n    }\n\n    schema{\n      query: RootQuery\n      mutation: RootMutation     \n    }\n  "),
    rootValue: {
        allMapEntities: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mapEntities_1.MAP_ENTITIES.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        createMapEntities: function (args) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mapEntities_1.MAP_ENTITIES.insertMany(args.mapEntityInput).then(function (result) {
                            return "Saved in the DB";
                        })["catch"](function (err) {
                            throw err;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        versionKey: false,
        timestamp: true
    },
    graphiql: true
}));
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
    APP.listen(4000, function () {
        console.log('App is listening on port 4000!'); // we gonna listen to requests only after the connection has complete
    });
})["catch"](function (err) {
    throw err;
});
