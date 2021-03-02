import { WorkingTimeParser } from './working-time.parser';
import { DonatorParser } from './donator.parser';
import { InstitutionParser } from './institution.parser';
import { NgModule, ModuleWithProviders } from "@angular/core";
import { AddressParser } from "./address.parser";
import { UserParser } from "./user-app.parser";
import { DonationParser } from "./donation.parser";
import { FoodParser } from './food.parser';

@NgModule({})
export class ParserModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ParserModule,
            providers: [
                AddressParser,
                UserParser,
                DonationParser,
                FoodParser,
                InstitutionParser,
                DonatorParser,
                WorkingTimeParser
            ]
        }
    }
}