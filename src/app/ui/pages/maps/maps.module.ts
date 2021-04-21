import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { googleMapsKey } from './../../../../environments/credentials';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MapsForInstitutionsComponent } from './maps-for-institutions/maps-for-institutions.component';
import { MapsForDonatorsComponent } from './maps-for-donators/maps-for-donators.component';


@NgModule({
  declarations: [MapsForInstitutionsComponent, MapsForDonatorsComponent],
  imports: [
    CommonModule,
    MapsRoutingModule,
    NgbModule,
    AgmCoreModule.forRoot({ apiKey: googleMapsKey }),
  ]
})
export class MapsModule { }
