import { DirectiveModule } from './../utils/directive.module';
import { MaterialModule } from './../core/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';

import { BasicelementsComponent } from './basicelements/basicelements.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TypographyComponent } from './typography/typography.component';
import { NucleoiconsComponent } from './nucleoicons/nucleoicons.component';
import { ComponentsComponent } from './components.component';
import { NotificationComponent } from './notification/notification.component';
import { NgbdModalBasic } from './modal/modal.component';
import { LoadingComponent } from './loading/loading.component';
import { EditInstitutionModalComponent } from './edit-institution-modal/edit-institution-modal.component';
import { DonationRequestModal } from './donation-request-modal/donation-request-modal.component';
import { EditDonatorModalComponent } from './edit-donator-modal/edit-donator-modal.component';
import { DonationOfferModalComponent } from './donation-offer-modal/donation-offer-modal.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module,
        ReactiveFormsModule,
        MaterialModule,
        DirectiveModule.forRoot(),
      ],
    declarations: [
        ComponentsComponent,
        BasicelementsComponent,
        NavigationComponent,
        TypographyComponent,
        NucleoiconsComponent,
        NotificationComponent,
        NgbdModalBasic,
        LoadingComponent,
        EditInstitutionModalComponent,
        DonationRequestModal,
        EditDonatorModalComponent,
        DonationOfferModalComponent
    ],
    exports:[ ComponentsComponent, LoadingComponent ]
})
export class ComponentsModule { }
