import {  AfterViewChecked,  ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { IEntity } from '../entity';
import {  selectMapEntitiesList, selectAllItems } from '../store/coronaLocations.selector';
import * as coronaLocationsActions from '../store/coronaLocations.action';
import { IMapEntity } from '../mapEntity';
import { HttpService } from '../../services/http.service';
import { MapService } from '../../services/map.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})

export class ListComponent implements OnInit,AfterViewChecked {  
  private _newMapEntitiesList$: Observable<IMapEntity[]> = new Observable<IMapEntity[]>();
  private _mapEntities: Observable<IMapEntity[]> = new Observable<IMapEntity[]>();
  private _newMapEntitiesList: IMapEntity[] = [];
  constructor(private _store: Store<{storeCoronaLocation: any}>,
    private _mapService: MapService,
    private _httpService: HttpService,
    private _changeDetector: ChangeDetectorRef) { 
  }
  
  get newMapEntitiesList$(): Observable<IMapEntity[]>{
    return this._newMapEntitiesList$;
  }

  get mapEntities(): Observable<IMapEntity[]>{
    return this._mapEntities;
  }

  set newMapEntitiesList$(newMapEntitiesList: Observable<IMapEntity[]>){
    this._newMapEntitiesList$=newMapEntitiesList;
  }

  get newMapEntitiesList(): IMapEntity[]{
    return this._newMapEntitiesList;
  }

  set newMapEntitiesList(newMapEntitiesList: IMapEntity[]){
    this._newMapEntitiesList=newMapEntitiesList;
  }

  set mapEntities(mapEntities: Observable<IMapEntity[]>){
    this._mapEntities=mapEntities;
  }

  ngOnInit(): void {
    this.newMapEntitiesList$ = this._store.select(selectAllItems);
    this.newMapEntitiesList$.subscribe(data=>this.newMapEntitiesList=data);
    this.mapEntities=this._store.select(selectMapEntitiesList); 
  }

  ngAfterViewChecked(): void{
    this._changeDetector.detectChanges();
  }

  public onClickCancel(entity: IMapEntity): void{
    this._store.dispatch(coronaLocationsActions.REMOVE_MAP_ALL_ENTITY({entityToRemove: entity})); 
    this._store.dispatch(coronaLocationsActions.SET_NEW_ENTITIES_ARRAY({newEntities: this.newMapEntitiesList}))  
  }

  public onClickSave(): void{  
     let message: Promise<string> = this._httpService.addMapEntities(this._newMapEntitiesList$);
     message.then(res=>alert(res))     
  }

  public flyToThePosition(entity: IEntity): void{
    let carto: any  = Cesium.Ellipsoid.WGS84.cartesianToCartographic(entity.position);       
    let lon: any = Cesium.Math.toDegrees(carto.longitude);
    let lat: any = Cesium.Math.toDegrees(carto.latitude);
    this._mapService.flyToThePosition(lon,lat);     
  }

}