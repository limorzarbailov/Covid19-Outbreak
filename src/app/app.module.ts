import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularCesiumModule, CesiumService, MapsManagerService } from 'angular-cesium';
import { AngularCesiumWidgetsModule } from 'angular-cesium';
import { MapComponent } from './map/map.component';
import { MapStabComponent } from './map-stab/map-stab.component';
import { ListComponent } from './list/list.component';
import { ScrollingModule} from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import * as fromCoronaLocations from '../app/store/coronaLocations.reducer';
import { DialogContentExampleDialogComponent } from './dialog-content-example-dialog/dialog-content-example-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapStabComponent,  
    ListComponent,   
    DialogContentExampleDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ScrollingModule,
    AngularCesiumModule.forRoot(),
    AngularCesiumWidgetsModule,   
    MatDialogModule,
    HttpClientModule,
    StoreModule.forRoot({
      storeCoronaLocation: fromCoronaLocations.reducer
    }),
    MatButtonModule
  ],
  providers: [MapsManagerService],
  bootstrap: [AppComponent],
  entryComponents: [DialogContentExampleDialogComponent]
})
export class AppModule { }
