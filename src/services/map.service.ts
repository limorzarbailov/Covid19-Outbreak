import { Injectable } from '@angular/core';
import { MapsManagerService } from 'angular-cesium';
import { IMapEntity } from '../app/mapEntity';
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

  public loadEntities(jsonEntities:any):IMapEntity[]{
    let entities: IMapEntity[] =[]
    jsonEntities.forEach((x: any)=>{
      let entity:IMapEntity={
        id: x?._id,
        entity: {
          position: this.convertToCartecian(x?.entity?.position.toString().replace("(","").replace(")","")),
          id: "",
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
