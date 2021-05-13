import express from "express";
import { graphqlHTTP } from "./node_modules/express-graphql/index.js";
import mongoose from 'mongoose';
import { schema } from './schema/index'
import { resolver } from './resolvers/index'

const APP = express();
const DB_URI ='mongodb://limorzarbailov:limor8527@cluster0-shard-00-00.nkv8q.mongodb.net:27017,cluster0-shard-00-01.nkv8q.mongodb.net:27017,cluster0-shard-00-02.nkv8q.mongodb.net:27017/CoronaOutbreak?ssl=true&replicaSet=atlas-1404zz-shard-0&authSource=admin&retryWrites=true&w=majority'

APP.use((req,res,next)=> {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization')
  if(req.method==="OPTIONS"){
    return res.sendStatus(200)
  }
  next();
})

APP.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolver,
  graphiql : true,
}));

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
  APP.listen(4000, function () {
    console.log('App is listening on port 4000!'); 
  });
  }).catch(err=>{
    throw err;
  })
