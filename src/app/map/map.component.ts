import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AcEntity,
  AcLayerComponent,
  AcNotification,
  ActionType,
  CameraService,
  CesiumEvent,
  CesiumEventModifier,
  CesiumService,
  CoordinateConverter,
  EventRegistrationInput,
  MapEventsManagerService,
  MapsManagerService,
  PickOptions, 
  ViewerConfiguration} from 'angular-cesium';
import { LayerService } from 'angular-cesium/lib/angular-cesium/services/layer-service/layer-service.service.d';
import { CesiumEventBuilder } from 'angular-cesium/lib/angular-cesium/services/map-events-mananger/cesium-event-builder';
import {MapStabComponent} from 'src/app/map-stab/map-stab.component';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [ViewerConfiguration]
})
export class MapComponent implements OnInit {
  public markingFlag:boolean = false; 


  constructor(viewerConf :ViewerConfiguration) { 
    viewerConf.viewerOptions = {timeline: false, 
                                homeButton:false,
                                infoBox:false,
                                baseLayerPicker:false,
                                imageryProvider: Cesium.createWorldImagery({
                                  style: Cesium.IonWorldImageryStyle.ROAD,
                                }),
                                fullscreenButton:false,
                                navigationHelpButton:false,
                                animation:false,
                                geocoder:false,
                                sceneModePicker:false,
                                navigationInstructionsInitiallyVisible:false,
                                selectionIndicator:false,
                                shouldAnimate:false
                      
  };
  this.markingFlag=false;

  }

  ngOnInit(): void {
    
  }

  mapMarkClicked():void{
    this.markingFlag=true;
 
  }

  
}
