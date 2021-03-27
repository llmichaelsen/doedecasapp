import { AgmCoreModule } from '@agm/core';
import { googleMapsKey } from './../../../../environments/credentials';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MapsRoutingModule,
    AgmCoreModule.forRoot({ apiKey: googleMapsKey }),
  ]
})
export class MapsModule { }
