import { NgModule, ModuleWithProviders } from "@angular/core";
import { AddressParser } from "./address.parser";
import { UserParser } from "./user.parser";

@NgModule({})
export class ParserModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ParserModule,
            providers: [
                AddressParser,
                UserParser
            ]
        }
    }
}