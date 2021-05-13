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
export class MapService {
  public viewer: any = this._mapsManagerService.getMap()?.getCesiumViewer();
  
  constructor(private _store: Store<{storeCoronaLocation: any}>,
    private _mapsManagerService: MapsManagerService,
    private _http: HttpClient) {
    
  }

  public flyToThePosition(lon:any, lat:any):void{
    this.viewer = this._mapsManagerService.getMap()?.getCesiumViewer();
    this.viewer?.camera.flyTo({destination: Cesium.Cartesian3.fromDegrees(parseInt(lon), parseInt(lat),heightFlyToPosition)});
    
  }

  public getAllMapEntities(): Observable<Object>{
    let mapEntities:Observable<Object>=new Observable<Object>();
    const REQUEST_BODY=  `{
      "query": "query {allMapEntities {_id,entity {position,saved}, actionType}}"
    }`;
    mapEntities= this._http.post<Object>("http://localhost:4000/graphql", REQUEST_BODY, { headers: { 'Content-Type': 'application/json' }});
    return mapEntities;
  } 

  public async addMapEntities(newMapEntitiesList: Observable<IMapEntity[]>): Promise<string>{
    let message: string ='';
    let entities: string="";  
    newMapEntitiesList.forEach(result=>result.map(entity=>entities+= `{entity:{position:"${entity.entity.position}",saved:true},actionType:0},`
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

  public loadEntities(jsonEntities:any):IMapEntity[]{
    let entities: IMapEntity[] =[]
    jsonEntities.forEach((x: any)=>{
      let entity:IMapEntity={
        id: x?._id,
        entity: {
          position: this.convertToCartecian(x?.entity?.position.toString().replace("(","").replace(")","")),
          id: "",
          saved: x?.entity?.saved,
        },
        actionType:x?.actionType
      }
      entities.push(entity);
    })
    return entities;
  }

  public convertToCartecian(position:string): any{
    let cordinates: string[] = position.split(",");
    let cartecian: any = new Cesium.Cartesian3(parseFloat(cordinates[0]),parseFloat(cordinates[1]),parseFloat(cordinates[2]))
    return cartecian;
  }
}
