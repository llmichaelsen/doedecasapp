import { ComponentsModule } from './../../../components/components.module';
import { MaterialModule } from './../../../core/material/material.module';
import { MyDonationsComponent } from './my-donations.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyDonationsRoutingModule } from './my-donations-routing.module';
import { MyDonationsForDonatorComponent } from './my-donations-for-donator/my-donations-for-donator.component';
import { MyDonationsForInstitutionComponent } from './my-donations-for-institution/my-donations-for-institution.component';


@NgModule({
  declarations: [MyDonationsComponent, MyDonationsForDonatorComponent, MyDonationsForInstitutionComponent],
  imports: [
    CommonModule,
    MyDonationsRoutingModule,
    MaterialModule,
    ComponentsModule
  ]
})
export class MyDonationsModule { }
