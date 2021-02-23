import { Institution } from './../models/user/institution.model';
import { Donator } from './../models/user/donator.model';
import { Injectable } from "@angular/core";
import { UserApp } from "app/ui/models/user/user-app.model";
import { AngularFireDatabase } from '@angular/fire/database';

import { UserParser } from "./parser/user-app.parser";
import { FirebaseGateway } from "app/ui/gateway/firebase.gateway";
import { AuthRepository } from "./auth.repository";

@Injectable()
export class UserRepository {

    constructor(private db: AngularFireDatabase, 
                private userParser: UserParser,
                private authRepository: AuthRepository
                ){}


    public async getUser(uid): Promise<UserApp> {
        try {
            const gateway = new FirebaseGateway(this.db);
            const result = await gateway.getItemByKey('userApp', uid);
            result.uid = uid;
            return Promise.resolve(this.userParser.parse(result));
        } catch (error) {
            return await Promise.reject(error);
        }
    }

}