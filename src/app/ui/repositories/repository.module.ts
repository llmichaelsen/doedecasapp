import { NotificationRepository } from './notification.repository';
import { DonatorRepository } from './donator.repository';
import { InstitutionRepository } from './institution.repository';
import { UserRepository } from './user.repository';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DonationRequestRepository } from './donation-request.repository';
import { FoodRepository } from './food.repository';
import { DonationOfferRepository } from './donation-offer.repository';


@NgModule({})
export class RepositoryModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RepositoryModule,
            providers: [
                DonationRequestRepository,
                DonationOfferRepository,
                FoodRepository,
                UserRepository,
                InstitutionRepository,
                DonatorRepository,
                NotificationRepository
            ]
        }
    }
}