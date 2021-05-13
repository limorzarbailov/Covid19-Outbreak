import { Component, Input } from '@angular/core';
import { mergeAll } from 'rxjs/operators';
import * as coronaLocationsActions from '../../app/store/coronaLocations.action';
import { selectAllItems, selectMapEntitiesList } from '../store/coronaLocations.selector'
import { MapService } from '../map.service'
import { 
  ActionType,
  CesiumEvent,
  CesiumService,
  EventRegistrationInput,
  MapEventsManagerService,
  PickOptions } from 'angular-cesium';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { IMapEntity } from '../mapEntity';
import { fixedDegrees } from '../../environments/environment';
import {MatDialog } from '@angular/material/dialog';
import { DialogContentExampleDialogComponent } from "../dialog-content-example-dialog/dialog-content-example-dialog.component"

@Component({
  selector: 'app-map-stab',
  templateUrl: './map-stab.component.html',
  styleUrls: ['./map-stab.component.css']
})
export class MapStabComponent {
  private _viewer = this._cesiumService.getViewer();
  private _mapEntities: Observable<IMapEntity> = new Observable<IMapEntity>();
  public _newMapEntities: Observable<IMapEntity> = new Observable<IMapEntity>();
  private _counterForEntityId: number=0;
  @Input()
  markingFlag!:boolean;


  constructor(private _eventManager: MapEventsManagerService,
    public dialog: MatDialog,
    private _mapService: MapService,
    private _cesiumService: CesiumService,
    private _store: Store<{storeCoronaLocation: any}>) { 
  
      const EVENT_REGISTRATION: EventRegistrationInput = {
        event: CesiumEvent.LEFT_CLICK, 
        priority: 0, 
        pick: PickOptions.PICK_ONE 
      };
      let loadEntities: Observable<Object> = this._mapService.getAllMapEntities();
      let entitiesInJson: any;
      let entities:IMapEntity[] =[]
      loadEntities.subscribe(res=>{
        entitiesInJson=(JSON.parse(JSON.stringify(res))?.data?.allMapEntities)
        entities = this._mapService.loadEntities(entitiesInJson)
        this._store.dispatch(coronaLocationsActions.LOAD_MAP_ENTITIES({mapEntities: entities}));
        
      });
      this.newMapEntities=this._store.select(selectAllItems).pipe(mergeAll());
      this.mapEntities = (this._store.select(selectMapEntitiesList).pipe(mergeAll())); 
      this._viewer._cesiumWidget._creditContainer.style.display = "none";
      const CLICK_EVENT = this._eventManager.register(EVENT_REGISTRATION);
      CLICK_EVENT.subscribe((result)=>{    
        if(this.markingFlag==true){
          const POS: any = result.movement.endPosition;
          let ellipsoid: any = this._viewer.scene.globe.ellipsoid;     
          let cartesian: any = this._viewer.camera.pickEllipsoid(POS, ellipsoid);       
          if (cartesian) {     
            let cartographic: any = ellipsoid.cartesianToCartographic(cartesian);      
            let longitudeString: any = Cesium.Math.toDegrees(cartographic.longitude).toFixed(fixedDegrees);       
            let latitudeString: any = Cesium.Math.toDegrees(cartographic.latitude).toFixed(fixedDegrees);        
            let height: any = Cesium.Math.toDegrees(cartographic.height).toFixed(fixedDegrees);   
            let newEntity: IMapEntity = {
              id:(this.counterForEntityId+1).toString(),
              entity:{
                position: new Cesium.Cartesian3.fromDegrees(longitudeString, latitudeString,height),
                id: (this.counterForEntityId+1).toString(),
                saved:false
              },
              actionType: ActionType.ADD_UPDATE
            }
            this.counterForEntityId = (this.counterForEntityId+1);              
            this._store.dispatch(coronaLocationsActions.ADD_ENTITY({entityToAdd: newEntity}))
          }
      }
      
      else{  
        this.dialog.open(DialogContentExampleDialogComponent);  
      }
      
    });
  }

  get mapEntities(): Observable<IMapEntity>{
    return this._mapEntities;
  }
  set mapEntities(mapEntities: Observable<IMapEntity>){
    this._mapEntities=mapEntities;
  }
  get newMapEntities(): Observable<IMapEntity>{
    return this._newMapEntities;
  }
  set newMapEntities(newMapEntities: Observable<IMapEntity>){
    this._newMapEntities=newMapEntities;
  }
  get counterForEntityId(): number{
    return this._counterForEntityId;
  }
  set counterForEntityId(counterForEntityId: number){
    this._counterForEntityId=counterForEntityId;
  }
}
