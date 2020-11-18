import { Injectable } from "@angular/core";
import { AuthRepository } from "../repositories/auth.repository";
import { User } from 'firebase';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { UserService } from "./user.service";
import { UserType } from "../models/user/user-type.enum";
import { UserRepository } from "../repositories/user.repository";
import { UserApp } from "../models/user/user.model";
import { UserParser } from "../repositories/parser/user.parser";
import * as firebase from "firebase";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user: User;

    constructor(
        private authRepository: AuthRepository,
        private userRepository: UserRepository,
        public afAuth: AngularFireAuth,
        public router: Router,
        private userParser: UserParser
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.user = user;
                localStorage.setItem('user', JSON.stringify(this.user));
            } else {
                localStorage.setItem('user', null);
            }
        })
    }

    async authenticate(email, password): Promise<UserApp> {
        try {
            const result = await this.authRepository.authenticate(email, password)
            this.updateLogin();            
            return this.setUserApp(result.user.uid);
        } catch (error) {
            return error;
        }
    }

    async setUserApp(uid?): Promise<UserApp> {
        if(!uid){
            uid = await (await this.getUser()).uid;
        }
        const user = await this.userRepository.getUser(uid);
        localStorage.setItem('userApp', JSON.stringify(user));
        return user;
    }

    async logout() {
        await firebase.auth().signOut();
        this.router.navigate(['/'])
    }

    updateLogin() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.user = user;
                localStorage.setItem('user', JSON.stringify(this.user));
            } else {
                localStorage.setItem('user', null);
                localStorage.setItem('userApp', null);
                this.returnLogin();
            }
        })
    }

    getUser(): Promise<User> {
        return new Promise((resolve, reject) => {
            this.afAuth.authState.subscribe(
                user => resolve(user),
                error => reject(error)
            )
        });
    }

    returnLogin() {
        this.router.navigate(['/login']);
    }

    getUserApp(): UserApp {
        return this.userParser.reparse(JSON.parse(localStorage.getItem('userApp')));
    }

    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return user !== null;
    }

    get isLoggedInAdmin(): boolean {
        const user = JSON.parse(localStorage.getItem('userApp'));
        if (!user) return null;
        return user.type === UserType.Admin;
    }



}