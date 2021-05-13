"use strict";
exports.__esModule = true;
var express = require("express");
var index_js_1 = require("./node_modules/express-graphql/index.js");
var mongoose = require("mongoose");
var index_1 = require("./schema/index");
var index_2 = require("./resolvers/index");
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
    schema: index_1.schema,
    rootValue: index_2.resolver,
    graphiql: true
}));
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
    APP.listen(4000, function () {
        console.log('App is listening on port 4000!');
    });
})["catch"](function (err) {
    throw err;
});
