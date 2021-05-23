import { MAP_ENTITIES } from '../model/mapEntities';
export const resolver = {
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
}
