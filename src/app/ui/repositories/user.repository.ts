import { Injectable } from "@angular/core";
import { UserApp } from "app/ui/models/user/user.model";
import { AngularFireDatabase } from '@angular/fire/database';

import { UserParser } from "./parser/user.parser";
import { FirebaseGateway } from "app/ui/gateway/firebase.gateway";
import { AuthRepository } from "./auth.repository";

@Injectable()
export class UserRepository {

    constructor(private db: AngularFireDatabase, 
                private userParser: UserParser,
                private authRepository: AuthRepository
                ){}

    public async saveUser(user: UserApp): Promise<any> {
        try {
            const userFirebase = await this.authRepository.register(user);
            user.uid = userFirebase.user.uid;
            const gateway = new FirebaseGateway(this.db);
            const result = await gateway.addItem('user', user);
            return Promise.resolve(result);
        } catch (error) {
            return await Promise.reject(error);
        }
    }

    public async getUsers(): Promise<UserApp[]> {
        try {
            const gateway = new FirebaseGateway(this.db);
            const result = await gateway.getList('user');
            return Promise.resolve(this.userParser.parseList(result));
        } catch (error) {
            return await Promise.reject(error);
        }
    }

    public async updateUser(user: UserApp): Promise<any> {
        try {
            const gateway = new FirebaseGateway(this.db);
            const result = await gateway.updateItem('user', user);
            return Promise.resolve(this.userParser.parseList(result));
        } catch (error) {
            return await Promise.reject(error);
        }
    }

    public async getUser(uid): Promise<UserApp> {
        try {
            const gateway = new FirebaseGateway(this.db);
            const result = await gateway.getItem('user', 'uid', uid);
            
            return Promise.resolve(this.userParser.parse(result[0]));
        } catch (error) {
            return await Promise.reject(error);
        }
    }

    public async deleteUser(user: UserApp): Promise<any> {
        try {
            await this.authRepository.unRegister(user);
            const gateway = new FirebaseGateway(this.db);
            const result = await gateway.deleteItem('user', user.key);
            return Promise.resolve(result);
        } catch (error) {
            return await Promise.reject(error);
        }
    }

}