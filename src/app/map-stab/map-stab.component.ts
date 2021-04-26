import { ChangeDetectionStrategy, Component, Input, OnInit, Output, ViewRef } from '@angular/core';
import { map, mergeAll } from 'rxjs/operators';
import * as coronaLocationsActions from '../../app/store/coronaLocations.action';
import { selectMapEntitiesList } from '../store/coronaLocations.selector'
import { selectCurrentItems } from '../store/coronaLocations.selector'
import { MapService } from '../map.service'
import { AcEntity,
  AcLayerComponent,
  AcNotification,
  ActionType,
  CameraService,
  Cartesian2,
  CesiumEvent,CesiumEventModifier,
  CesiumService,
  CoordinateConverter,
  EventRegistrationInput,
  MapEventsManagerService,
  MapsManagerService,
  PickOptions } from 'angular-cesium';
import { from, identity, interval, Observable, of } from 'rxjs';
import { IEntity } from '../entity';
import { MemoizedSelector, Store } from '@ngrx/store';
import { IMapEntity } from '../mapEntity';

import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogContentExampleDialogComponent } from "../dialog-content-example-dialog/dialog-content-example-dialog.component"
@Component({
  selector: 'app-map-stab',
  templateUrl: './map-stab.component.html',
  styleUrls: ['./map-stab.component.css']
})
export class MapStabComponent implements OnInit {
  public viewer = this._cesiumService.getViewer();
  public mapEntities: Observable<IMapEntity> = new Observable<IMapEntity>();
  public counterForEntityId: number = 1;
  @Input()
  markingFlag!:boolean;


  constructor(private _eventManager: MapEventsManagerService,
    public dialog: MatDialog,
    private _mapService: MapService,
    private _cesiumService: CesiumService,
    private _store: Store<{storeCoronaLocation: any}>) { 
      this.counterForEntityId = 0;  
      const EVENT_REGISTRATION: EventRegistrationInput = {
        event: CesiumEvent.LEFT_CLICK, 
        priority: 0, 
        pick: PickOptions.PICK_ONE 
      };
      let x= this._mapService.getAllMapEntities();
      let entitiesInJson;
      let entities:IMapEntity[] =[]
      x.subscribe(res=>{
        entitiesInJson=(JSON.parse(JSON.stringify(res))?.data?.allMapEntities)
        entities= this._mapService.loadEntities(entitiesInJson)
        this._store.dispatch(coronaLocationsActions.LOAD_MAP_ENTITIES({mapEntities: entities}));

      })
      this.mapEntities = this._store.select(selectMapEntitiesList).pipe(mergeAll());      
      this.viewer._cesiumWidget._creditContainer.style.display = "none";
      const CLICK_EVENT = this._eventManager.register(EVENT_REGISTRATION);
      CLICK_EVENT.subscribe((result)=>{    
        if(this.markingFlag==true){
          const POS = result.movement.endPosition;
          let ellipsoid = this.viewer.scene.globe.ellipsoid;     
          let cartesian = this.viewer.camera.pickEllipsoid(POS, ellipsoid);       
          if (cartesian) {     
            let cartographic = ellipsoid.cartesianToCartographic(cartesian);      
            let longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(15);       
            let latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(15);        
            let height = Cesium.Math.toDegrees(cartographic.height).toFixed(15);   
            let newEntity: IMapEntity = {
              id:(this.counterForEntityId+1).toString(),
              entity:{
                position: new Cesium.Cartesian3.fromDegrees(longitudeString, latitudeString,height),
                id: (this.counterForEntityId+1).toString(),
                saved:false
              },
              actionType: ActionType.ADD_UPDATE
            }
            this.counterForEntityId++;       
            this._store.dispatch(coronaLocationsActions.ADD_MAP_ENTITY({entityToAdd: newEntity}));        
          }
      }
      else{  
        this.dialog.open(DialogContentExampleDialogComponent);   
      }
    });
  }
  ngOnInit(){ 
  
  }
}
