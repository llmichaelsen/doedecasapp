import { UserApp } from "app/ui/models/user/user-app.model";
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

        user.firstName = payload.firstName;
        user.lastName = payload.lastName;
        user.password = payload.password;
        user.type = payload.type;
        user.uid = payload.uid;
        user.email = payload.email;
        user.obs = payload.obs;
        user.address = this.addressParser.parse(payload.address);

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
        user.uid = data.uid;
        user.email = data.email;
        user.obs = data.obs;
        user.address = this.addressParser.parse(data.address);

        return user;
    }
}