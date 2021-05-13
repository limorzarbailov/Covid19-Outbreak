import { createSelector } from '@ngrx/store';
import { State } from './coronaLocations.reducer';

export const selectMapEntitiesList = createSelector(
    (state: {storeCoronaLocation:State} ) => state.storeCoronaLocation,
  (state) => state.mapEntities
);

export const selectAllItems = createSelector(
    (state: {storeCoronaLocation:State} ) => state.storeCoronaLocation,
  (state) => state.newEntities
);


