import { DonationRequestService } from './donation-request.service';
import { FoodService } from './food.service';
import { InstitutionService } from './institution.service';
import { DonatorService } from './donator.service';
import { DonationOfferService } from './donation-offer.service';
import { UserService } from './user.service';
import { LoadingService } from './loading.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { GeocodeService } from './geocode.service';
import { NotificationService } from './notification.service';
import { AlertService } from './alert.service';


@NgModule({})
export class ServiceModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ServiceModule,
            providers: [
                LoadingService,
                UserService,
                DonationOfferService,
                DonationRequestService,
                DonatorService,
                InstitutionService,
                GeocodeService,
                NotificationService,
                AlertService
            ]
        }
    }
}