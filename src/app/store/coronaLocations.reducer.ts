import * as coronaLocationsActions from './coronaLocations.action';
import { IMapEntity } from '../mapEntity'
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IEntity } from '../entity';
import { Button } from 'protractor';
import { state } from '@angular/animations';
import { ActionType } from 'angular-cesium';
import { from, Observable } from 'rxjs';
import { IMockServer } from '@graphql-tools/mock';

export interface State {
    mapEntities : IMapEntity[];
    newMapEntities: IEntity[];

}

const INITIAL_STATE: State = {
    mapEntities: [],
    newMapEntities: [],

}

const _reducer = createReducer(INITIAL_STATE,
  on(coronaLocationsActions.LOAD_MAP_ENTITIES, (state, {mapEntities}) =>{
    return{
      ...state,
      mapEntities: mapEntities ,
     
    };
  }),
  on(coronaLocationsActions.ADD_MAP_ENTITY,(state, {entityToAdd})=>{
    return{
      ...state,
      mapEntities: addItem(state.mapEntities, entityToAdd) as IMapEntity[],
      newMapEntities: addItem(state.newMapEntities, entityToAdd.entity) as IEntity[],

    }
  }),
  on(coronaLocationsActions.REMOVE_MAP_ENTITY,(state, {entityToRemove})=>{

    return{
      ...state,
      mapEntities: removeItem(state.mapEntities,entityToRemove,1) as IMapEntity[],
      newMapEntities: removeItem(state.newMapEntities,entityToRemove,2) as IEntity[]
    }

  }),
  on(coronaLocationsActions.SET_TEMPORARY_LIST, (state)=> {
    return{
      ...state,
      mapEntities: setEntitesAfterSaving(state.mapEntities) as IMapEntity[],
      newMapEntities: [] 
    }

  })
  
  )
 const addItem = (mapEntitiesArray: any[], entity: any): any[] => {
    const mapEntitiesTmp: any[] = [...mapEntitiesArray];
    mapEntitiesTmp.push(entity);
  
    return mapEntitiesTmp;
  };

  const removeItem = (entitiesArray:any[], entity:IMapEntity, flag: number):any[]=>{
    const entitiesArrayWithCanceled:any[]= [...entitiesArray]
    if (flag == 1){
      let index = entitiesArray.map(item=>item.entity.position).indexOf(entity.entity.position)
      let canceledEntity: IMapEntity = {
        id:entitiesArray[index].id,
        entity:{
          position: entitiesArray[index].position,
          id: entitiesArray[index].id,
          saved: false
        },
        actionType: ActionType.DELETE
      
      }
      
      entitiesArrayWithCanceled.push(canceledEntity);
    
      
      
    }   
    const returnEntity: any[] = entitiesArrayWithCanceled.filter(item=>item.id!=entity.id || item.actionType==1);
    
    
    return returnEntity;
  }


export function setEntitesAfterSaving(mapEntities: IMapEntity[]): any[] {
  let returnEntities: Array<IMapEntity> = new Array<IMapEntity>();
  let mapEntitiesAfterFilter:IMapEntity[]= [...mapEntities].filter(item=>item.actionType!=1);
  let tmp: IEntity[]=mapEntities.map((entity) => entity.entity)

  mapEntitiesAfterFilter.forEach(element=>{
    let x: IMapEntity = {id:element.id,
      entity:{
        position: element.entity.position,
        id: element.id,
        saved:true
      },
      
      actionType: ActionType.ADD_UPDATE}
      returnEntities.push(x);
      tmp.push(x.entity);
  })
  

  return returnEntities;

  
  

}


export function reducer(state: State | undefined,action: Action){
  return _reducer(state,action);
}



