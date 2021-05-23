import { Injectable } from '@angular/core';
import { MapsManagerService } from 'angular-cesium';
import { IMapEntity } from '../../src/app/mapEntity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as coronaLocationsActions from '../app/store/coronaLocations.action';
import { heightFlyToPosition } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _store: Store<{storeCoronaLocation: any}>,private _http: HttpClient) { }

  public getAllMapEntities(): Observable<Object>{
    let mapEntities:Observable<Object>=new Observable<Object>();
    const REQUEST_BODY=  `{
      "query": "query {allMapEntities {_id,entity {position}, actionType}}"
    }`;
    mapEntities= this._http.post<Object>("http://localhost:4000/graphql", REQUEST_BODY, { headers: { 'Content-Type': 'application/json' }});
    return mapEntities;
  } 

  public async addMapEntities(newMapEntitiesList: Observable<IMapEntity[]>): Promise<string>{
    let message: string ='';
    let entities: string="";  
    newMapEntitiesList.forEach(result=>result.map(entity=>entities+= `{entity:{position:"${entity.entity.position}"},actionType:0},`
    ))
    entities = entities.slice(0,-1); 
    const REQUEST_BODY={
        query: `
          mutation{
            createMapEntities(mapEntityInput:[${entities}])
          }
        `
    };
    this._store.dispatch(coronaLocationsActions.SET_TEMPORARY_LIST());     
    await fetch('http://localhost:4000/graphql',{
      method: 'POST',
      body: JSON.stringify(REQUEST_BODY),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res=>{
      message="Landmarks Saved Successfully";
      return res.json();
      
    }).catch(err=>{
      message=err;
      throw new Error(err);
    });  
    return message;
  }
}
