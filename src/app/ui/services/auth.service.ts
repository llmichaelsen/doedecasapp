import { UserService } from "app/ui/services/user.service";
import { Injectable } from "@angular/core";
import { AuthRepository } from "../repositories/auth.repository";
import { User } from "firebase";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { UserType } from "../models/user/user-type.enum";
import { UserApp } from "../models/user/user-app.model";
import { UserParser } from "../repositories/parser/user-app.parser";
import * as firebase from "firebase";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user: User;

  constructor(
    private authRepository: AuthRepository,
    private userServ: UserService,
    public afAuth: AngularFireAuth,
    public router: Router,
    private userParser: UserParser
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem("user", JSON.stringify(this.user));
        this.setUserApp();
      } else {
        localStorage.setItem("user", null);
      }
    });
  }

  async authenticate(email, password): Promise<UserApp> {
    try {
      const result = await this.authRepository.authenticate(email, password);
      this.updateLogin();
      return this.setUserApp(result.user.uid);
    } catch (error) {
      throw error;
    }
  }

  async setUserApp(uid?): Promise<UserApp> {
    if (!uid) {
      uid = await (await this.getUser()).uid;
    }
    const user = await this.userServ.getUser(uid);
    localStorage.setItem("userApp", JSON.stringify(user));
    return user;
  }

  async logout() {
    await firebase.auth().signOut();
    this.updateLogin();
    this.router.navigate(["/"]);
  }

  updateLogin() {
    this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        this.user = user;
        localStorage.setItem("user", JSON.stringify(this.user));
        await this.setUserApp();
      } else {
        localStorage.setItem("user", null);
        localStorage.setItem("userApp", null);
        this.returnLogin();
      }
    });
  }

  getUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe(
        (user) => resolve(user),
        (error) => reject(error)
      );
    });
  }

  returnLogin() {
    this.router.navigate(["/login"]);
  }

  getUserApp(): UserApp {
    return this.userParser.reparse(JSON.parse(localStorage.getItem("userApp")));
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null;
  }

  get isLoggedInAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem("userApp"));
    if (!user) return null;
    return user.type === UserType.Admin;
  }

  get isUserDonator(): boolean {
    const user = JSON.parse(localStorage.getItem("userApp"));
    if (!user) return null;
    return user.type === UserType.Doador;
  }

  async deleteUser(password: string): Promise<boolean> {
    try {
      await this.authRepository.unRegister(this.user.email, password);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async sendRecoverEmail(email: string): Promise<void> {
    try {
      await this.authRepository.sendRecoverEmail(email);
    } catch (error) {
      throw error;
    }
  }
  
}
