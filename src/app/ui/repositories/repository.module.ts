import { DonatorRepository } from './donator.repository';
import { InstitutionRepository } from './institution.repository';
import { UserRepository } from './user.repository';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DonationRepository } from './donation.repository';
import { FoodRepository } from './food.repository';


@NgModule({})
export class RepositoryModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RepositoryModule,
            providers: [
                DonationRepository,
                FoodRepository,
                UserRepository,
                InstitutionRepository,
                DonatorRepository
            ]
        }
    }
}