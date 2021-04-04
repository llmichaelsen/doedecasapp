import { DirectiveModule } from './../../../utils/directive.module';
import { RegisterComponent } from './register.component';
import { MaterialModule } from './../../../core/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterInstitutionComponent } from './register-institution/register-institution.component';


@NgModule({
  declarations: [RegisterComponent, RegisterInstitutionComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DirectiveModule
  ]
})
export class RegisterModule { }
