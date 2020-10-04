import { UserApp } from "app/ui/models/user/user.model";
import { AbstractParser } from "./parser";
import { AddressParser } from "./address.parser";
import { Injectable } from "@angular/core";

@Injectable()
export class UserParser extends AbstractParser<UserApp> {

    constructor(private addressParser: AddressParser){
        super();
    }
    
    parse(payload) :UserApp {
        
        const user = new UserApp;
        if(!payload) return user;

        const data = payload.payload.val();

        user.key = payload.payload.key;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.password = data.password;
        user.type = data.type;
        user.email = data.email;
        user.obs = data.obs;
        user.address = this.addressParser.parse(data.address);

        return user;
    }

    reparse(payload) :UserApp {

        const user = new UserApp;
        if(!payload) return user;

        const data = payload;

        user.key = data.key;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.password = data.password;
        user.type = data.type;
        user.email = data.email;
        user.obs = data.obs;
        user.address = this.addressParser.parse(data.address);

        return user;
    }
}