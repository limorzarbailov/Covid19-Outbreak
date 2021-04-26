import { Injectable, OnInit } from '@angular/core';
import { CesiumService, MapsManagerService } from 'angular-cesium';


import { IMapEntity } from '../../src/app/mapEntity';
import { from, Observable, of } from 'rxjs';
import { IEntity } from './entity';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as coronaLocationsActions from '../app/store/coronaLocations.action';
@Injectable({
  providedIn: 'root'
})
export class MapService {
  public viewer = this._mapsManagerService.getMap()?.getCesiumViewer();
  public mapEntities: IMapEntity[]=[];
  constructor(private _store: Store<{storeCoronaLocation: any}>,
    private _mapsManagerService: MapsManagerService,
    private _http: HttpClient) {
    
  }

  flyToThePosition(lon:any, lat:any):void{
    this.viewer = this._mapsManagerService.getMap()?.getCesiumViewer();
    this.viewer?.camera.flyTo({destination: Cesium.Cartesian3.fromDegrees(parseInt(lon), parseInt(lat),1000000)});
  }

  getAllMapEntities(): Observable<Object>{
    let mapEntities3:Observable<Object>=new Observable<Object>();
    const REQUEST_BODY=  `{
      "query": "query {allMapEntities {_id,entity {position,saved}, actionType}}"
    }`;
    mapEntities3= this._http.post<Object>("http://localhost:4000/graphql", REQUEST_BODY, { headers: { 'Content-Type': 'application/json' }});
    return mapEntities3
  } 

  async addMapEntities(newMapEntitiesList: Observable<IEntity[]>): Promise<string>{
    let message='';
    let entities:String="";  
    newMapEntitiesList.forEach(result=>result.map(entity=>entities+= `{entity:{position:"${entity.position}",saved:true},actionType:0},`
    ))
    entities=entities.slice(0,-1); 
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

  loadEntities(jsonEntities:any):IMapEntity[]{
    let entities:IMapEntity[] =[]
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

  convertToCartecian(position:string):any{
    let cordinates=position.split(",");
    let cartecian=new Cesium.Cartesian3(parseFloat(cordinates[0]),parseFloat(cordinates[1]),parseFloat(cordinates[2]))
    return cartecian;
  }
}
