import * as coronaLocationsActions from './coronaLocations.action';
import { IMapEntity } from '../mapEntity'
import { Action, createReducer, on } from '@ngrx/store';
import { ActionType } from 'angular-cesium';

export interface State {
    mapEntities : IMapEntity[];
    newEntities: IMapEntity[];
}

const INITIAL_STATE: State = {
    mapEntities: [],
    newEntities: []
}

const _reducer = createReducer(INITIAL_STATE,
  on(coronaLocationsActions.LOAD_MAP_ENTITIES, (state, {mapEntities}) =>{
    return{
      ...state,
      mapEntities: mapEntities,
       
    };
  }),
  on(coronaLocationsActions.SET_TEMPORARY_LIST, (state)=> {
    return{
      ...state,
      mapEntities: setEntitesAfterSaving(state.mapEntities,state.newEntities),
      newEntities: [] 
    }
  }),
  on(coronaLocationsActions.ADD_ENTITY, (state, {entityToAdd})=> {
    return{
      ...state,
      newEntities: addItem(state.newEntities,entityToAdd)
    }
  }),
  on(coronaLocationsActions.REMOVE_MAP_ALL_ENTITY, (state, {entityToRemove})=> {
    return{
      ...state,
      newEntities: removeItem(entityToRemove,state.newEntities)
    }
  }),
  on(coronaLocationsActions.SET_NEW_ENTITIES_ARRAY, (state, {newEntities})=> {
    return{
      ...state,
      newEntities: setNewEntitiesArray(newEntities)
    }
  }),
  )
 const addItem = (mapEntitiesArray: any[], entity: any): any[] => {
    const mapEntitiesTmp: any[] = [...mapEntitiesArray];
    mapEntitiesTmp.push(entity);
    return mapEntitiesTmp;
  };

export function setEntitesAfterSaving(mapEntities: IMapEntity[],newEntities2: IMapEntity[]): IMapEntity[] {
  const newE: IMapEntity[] = [...mapEntities]; 
  newEntities2.forEach(mapEntity=>{
    newE.push(mapEntity);
  });
  return newE;
}

export function removeItem(entityToRemove: IMapEntity,entitiesArray:IMapEntity[]): IMapEntity[]{
  let mapEntities:IMapEntity[]= []
  entitiesArray.forEach(entity=>{
    if (entity.id == entityToRemove.id){
      let mapEntity: IMapEntity={
        id: entity.id,
        entity: {
          id: entity.id,
          position: entity.entity.position
        },
        
        actionType: ActionType.DELETE
      }
      mapEntities.push(mapEntity);
    }
    else{
      mapEntities.push(entity);
    }
  })
  return mapEntities;
}

function setNewEntitiesArray(newEntities: IMapEntity[]): IMapEntity[] { 
  return newEntities.filter(entity=> entity.actionType!=ActionType.DELETE);
}
export function reducer(state: State | undefined,action: Action){
  return _reducer(state,action);
}





