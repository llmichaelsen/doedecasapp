import { InstitutionService } from './institution.service';
import { DonatorService } from './donator.service';
import { DonationService } from './donation.service';
import { UserService } from './user.service';
import { LoadingService } from './loading.service';
import { ModuleWithProviders, NgModule } from '@angular/core';


@NgModule({})
export class ServiceModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ServiceModule,
            providers: [
                LoadingService,
                UserService,
                DonationService,
                DonatorService,
                InstitutionService
            ]
        }
    }
}