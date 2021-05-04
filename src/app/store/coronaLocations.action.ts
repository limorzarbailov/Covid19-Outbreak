import { Action, createAction, props } from '@ngrx/store';
import { IEntity } from '../entity'
import { IMapEntity } from '../mapEntity';

export const LOAD_MAP_ENTITIES = createAction('[CoronaLocations] Load Locations' , props<{mapEntities: IMapEntity[]}>());
export const ADD_MAP_ENTITY = createAction('[CoronaLocations] Add Map Entity', props<{entityToAdd: IMapEntity}>());
export const REMOVE_MAP_ENTITY = createAction('[CoronaLocations] Remove Map Entity From Temporery List', props<{entityToRemove: IMapEntity}>());
export const SET_TEMPORARY_LIST = createAction('[CoronaLocations] Set Temporary List');
export const SET_MAP = createAction('[CoronaLocations] Set Map');




