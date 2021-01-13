import { googleMapsKey } from './../../../../environments/credentials';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';


@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    MapRoutingModule,    
    AgmCoreModule.forRoot({ apiKey: googleMapsKey }),
  ]
})
export class MapModule { }
