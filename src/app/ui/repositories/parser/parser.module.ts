import { DonationRequestParser } from './donation-request.parser';
import { DonationOfferParser } from './donation-offer.parser';
import { WorkingTimeParser } from './working-time.parser';
import { DonatorParser } from './donator.parser';
import { InstitutionParser } from './institution.parser';
import { NgModule, ModuleWithProviders } from "@angular/core";
import { AddressParser } from "./address.parser";
import { UserParser } from "./user-app.parser";
import { FoodParser } from './food.parser';
import { NotificationParser } from './notification.parser';
import { FoodAmountParser } from './food-amount.parser';

@NgModule({})
export class ParserModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ParserModule,
            providers: [
                AddressParser,
                UserParser,
                DonationOfferParser,
                DonationRequestParser,
                FoodParser,
                InstitutionParser,
                DonatorParser,
                WorkingTimeParser,
                NotificationParser,
                FoodAmountParser
            ]
        }
    }
}