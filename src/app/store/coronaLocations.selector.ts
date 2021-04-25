import { createSelector } from '@ngrx/store';
import { State } from './coronaLocations.reducer';

/*export interface AppState {
    feature: State;
}*/


export const selectMapEntitiesList = createSelector(
    (state: {storeCoronaLocation:State} ) => state.storeCoronaLocation,
  (state) => state.mapEntities
);

export const selectCurrentItems = createSelector(
    (state: {storeCoronaLocation:State} ) => state.storeCoronaLocation,
  (state) => state.newMapEntities
);


