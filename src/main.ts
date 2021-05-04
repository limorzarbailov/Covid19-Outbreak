import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

Cesium.buildModuleUrl.setBaseUrl('/assets/cesium/');
Cesium.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMmI2ZWExYS0xNTFjLTRjYWMtODdhZS05ZjM5ZGM5NmQ4OWIiLCJpZCI6NDk4MzcsImlhdCI6MTYxNzUxNzIyNX0.Ef1KprKWSby5uPkEc9LDK5yu-fwYuMAXGDzmSzQKmtM";

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
