import { Donator } from './../../models/user/donator.model';
import { AddressParser } from './address.parser';
import { AbstractParser } from "./parser";
import { Injectable } from "@angular/core";

@Injectable()
export class DonatorParser extends AbstractParser<Donator> {

    constructor(private addressParser: AddressParser){
        super();
    }

    parse(payload): Donator {
        const donator: Donator = new Donator();
        if(!payload) return donator;

        const info = payload.payload.val() || payload;

        donator.firstName = info.firstName;
        donator.lastName = info.lastName;
        donator.address = this.addressParser.parse(info.address);
        donator.obs = info.obs;
        return donator;
    }

    reparse(payload): Donator {
        const donator: Donator = new Donator();
        if(!payload) return donator;

        const info = payload;

        donator.firstName = info.firstName;
        donator.lastName = info.lastName;
        donator.address = this.addressParser.parse(info.address);
        donator.obs = info.obs;
        return donator;
    }
}