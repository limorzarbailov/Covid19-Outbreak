import * as express  from "express";
import { graphqlHTTP } from "./node_modules/express-graphql/index.js";
import {buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLFloat } from 'graphql';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { resolve } from "dns";
import { IEntity } from '../src/app/entity';
import * as mongoose from 'mongoose';
import { MAP_ENTITIES } from './model/mapEntities';
import { timestamp } from "rxjs/operators";
import { ObjectId } from "bson";


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
  schema: buildSchema(`
    type Entity{
      position: String
      saved: Boolean
    }
    input EntityInput{
      position: String
      saved: Boolean
    }

    type MapEntity{
      _id: ID
      entity: Entity
      actionType: Int
    }

    input MapEntityInput{
      entity: EntityInput
      actionType: Int
    }
  
  
    type RootQuery{
      allMapEntities: [MapEntity]
     
    }

    type RootMutation{  
      createMapEntities(mapEntityInput: [MapEntityInput]):String

    }

    schema{
      query: RootQuery
      mutation: RootMutation
      
    }
   
    

  `),
  rootValue: {
    allMapEntities: async ()=>{
      
      return await MAP_ENTITIES.find()
    },
    createMapEntities: async(args: any)=>{ 
      
      return await MAP_ENTITIES.insertMany(args.mapEntityInput).then(result=>{
              
              return "Saved in the DB";
              
          }).catch(err=>{
            throw err;
              
          });
      
     
    },
    versionKey:false,
    timestamp:true
  },
  graphiql : true,
  

}));

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
  APP.listen(4000, function () {
    console.log('App is listening on port 4000!'); // we gonna listen to requests only after the connection has complete
});
}).catch(err=>{
  throw err;
})
