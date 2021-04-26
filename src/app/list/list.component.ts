import {  AfterViewChecked,  ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { IEntity } from '../entity';
import {  selectCurrentItems, selectMapEntitiesList } from '../store/coronaLocations.selector';
import * as coronaLocationsActions from '../store/coronaLocations.action';
import { IMapEntity } from '../mapEntity';
import { ActionType } from 'angular-cesium';
import { MapService } from '../map.service'
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})

export class ListComponent implements OnInit,AfterViewChecked {  
  private _newMapEntitiesList: Observable<IEntity[]> = new Observable<IEntity[]>();
  private _mapEntities: Observable<IMapEntity[]> = new Observable<IMapEntity[]>()
  constructor(private _store: Store<{storeCoronaLocation: any}>,
    private _mapService: MapService,
    private _changeDetector: ChangeDetectorRef) { 
  }
  get newMapEntitiesList(): Observable<IEntity[]>{
    return this._newMapEntitiesList;
  }
  get mapEntities(): Observable<IMapEntity[]>{
    return this._mapEntities;
  }
  set newMapEntitiesList(newMapEntitiesList: Observable<IEntity[]>){
    this._newMapEntitiesList=newMapEntitiesList;
  }
  set mapEntities(mapEntities: Observable<IMapEntity[]>){
    this._mapEntities=mapEntities;
  }
  ngOnInit(): void {
    this._store.select(selectCurrentItems).subscribe(data=> this.newMapEntitiesList=(of(data)));
    this._store.select(selectMapEntitiesList).subscribe(data=>{
      this.mapEntities=(of(data.filter(item=>item.entity.saved==true)))
     })       
  }
  ngAfterViewChecked(): void{
    this._changeDetector.detectChanges();
  }

  onClickCancel(entity: IEntity): void{
    let entityTmp: IMapEntity = {
      id:entity.id,
      entity:{
        position: entity.position,
        id: entity.id,
        saved: false
      },
      actionType: ActionType.ADD_UPDATE 
    }
    this._store.dispatch(coronaLocationsActions.REMOVE_MAP_ENTITY({entityToRemove: entityTmp}));   
  }

  onClickSave(): void{
    let message= this._mapService.addMapEntities(this._newMapEntitiesList);
    message.then(res=>alert(res))     
  }

  flyToThePosition(entity: IEntity): void{
    let carto  = Cesium.Ellipsoid.WGS84.cartesianToCartographic(entity.position);       
    let lon = Cesium.Math.toDegrees(carto.longitude);
    let lat = Cesium.Math.toDegrees(carto.latitude);
    this._mapService.flyToThePosition(lon,lat);     
  }

}