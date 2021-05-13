import {  AfterViewChecked,  ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { IEntity } from '../entity';
import {  selectMapEntitiesList, selectAllItems } from '../store/coronaLocations.selector';
import * as coronaLocationsActions from '../store/coronaLocations.action';
import { IMapEntity } from '../mapEntity';
import { MapService } from '../map.service'
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})

export class ListComponent implements OnInit,AfterViewChecked {  
  private _newMapEntitiesList: Observable<IMapEntity[]> = new Observable<IMapEntity[]>();
  private _mapEntities: Observable<IMapEntity[]> = new Observable<IMapEntity[]>()
  constructor(private _store: Store<{storeCoronaLocation: any}>,
    private _mapService: MapService,
    private _changeDetector: ChangeDetectorRef) { 
  }
  get newMapEntitiesList(): Observable<IMapEntity[]>{
    return this._newMapEntitiesList;
  }
  get mapEntities(): Observable<IMapEntity[]>{
    return this._mapEntities;
  }
  set newMapEntitiesList(newMapEntitiesList: Observable<IMapEntity[]>){
    this._newMapEntitiesList=newMapEntitiesList;
  }
  set mapEntities(mapEntities: Observable<IMapEntity[]>){
    this._mapEntities=mapEntities;
  }
  ngOnInit(): void {
    this._store.select(selectAllItems).subscribe(data=> this.newMapEntitiesList=(of(data)));
    this._store.select(selectMapEntitiesList).subscribe(data=>{
      this.mapEntities=of(data)
     })       
  }
  ngAfterViewChecked(): void{
    this._changeDetector.detectChanges();
  }

  public onClickCancel(entity: IMapEntity): void{
    let entities: IMapEntity[]=[];
    this._store.dispatch(coronaLocationsActions.REMOVE_MAP_ALL_ENTITY({entityToRemove: entity})); 
    this._newMapEntitiesList.subscribe(data=>entities=data);
    this._store.dispatch(coronaLocationsActions.SET_NEW_ENTITIES_ARRAY({newEntities: entities}))  
  }

  public onClickSave(): void{  
     let message: Promise<string> = this._mapService.addMapEntities(this._newMapEntitiesList);
     message.then(res=>alert(res))     
  }

  public flyToThePosition(entity: IEntity): void{
    let carto: any  = Cesium.Ellipsoid.WGS84.cartesianToCartographic(entity.position);       
    let lon: any = Cesium.Math.toDegrees(carto.longitude);
    let lat: any = Cesium.Math.toDegrees(carto.latitude);
    this._mapService.flyToThePosition(lon,lat);     
  }

}