import { Component } from '@angular/core';
import { ViewerConfiguration} from 'angular-cesium';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [ViewerConfiguration]
})
export class MapComponent {
  private _markingFlag:boolean = false; 
  constructor(_viewerConf :ViewerConfiguration) { 
    _viewerConf.viewerOptions = {timeline: false, 
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

  get markingFlag(): boolean{
    return this._markingFlag;
  }
  set markingFlag(markingFlag:boolean){
    this._markingFlag=markingFlag;
  }

  public mapMarkClicked():void{
    this.markingFlag=(true);
  } 
}
