import { Address } from "app/ui/models/user/address.model";
import { AbstractParser } from "./parser";
import { Injectable } from "@angular/core";

@Injectable()
export class AddressParser extends AbstractParser<Address> {
    
    parse(payload): Address {
        const address = new Address();
        if(!payload) return address;

        address.street = payload.street;
        address.number = payload.number;
        address.complement = payload.complement;
        address.district = payload.district;
        address.city = payload.city;
        address.uf = payload.uf;
        return address;
    }
}