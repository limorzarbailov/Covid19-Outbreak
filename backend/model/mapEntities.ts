import { Schema , Document , Model , model } from 'mongoose';

export interface IMapEntity extends Document {
   
    _id: String;
    entity: Object;
    actionType: Number;    
}

const MAP_ENTITY_SCHEMA: Schema = new Schema ({   
     entity: { 
        type: Object, required: true
    },
    actionType: { 
        type: Number, required: true
    }
});

export const MAP_ENTITIES: Model<IMapEntity> = model('entities', MAP_ENTITY_SCHEMA);