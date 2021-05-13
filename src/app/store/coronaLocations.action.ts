import { createAction, props } from '@ngrx/store';
import { IMapEntity } from '../mapEntity';

export const LOAD_MAP_ENTITIES = createAction('[CoronaLocations] Load Locations' , props<{mapEntities: IMapEntity[]}>());
export const SET_TEMPORARY_LIST = createAction('[CoronaLocations] Set Temporary List');
export const ADD_ENTITY = createAction('[CoronaLocations] Add Entity', props<{entityToAdd: IMapEntity}>());
export const REMOVE_MAP_ALL_ENTITY = createAction('[CoronaLocations] Remove Map Entity From Temporery List2', props<{entityToRemove: IMapEntity}>());
export const SET_NEW_ENTITIES_ARRAY = createAction('[CoronaLocations] Set New Entities Array' , props<{newEntities: IMapEntity[]}>());


