import { RootQuery } from '../query/query';
import { rootMutation } from '../mutation/mutation';

export const schemaType = `schema{
    query: RootQuery
    mutation: RootMutation   
    
  }
    ${RootQuery}
    ${rootMutation}
  `