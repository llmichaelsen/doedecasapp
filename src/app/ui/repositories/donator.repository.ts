import { DonatorParser } from "./parser/donator.parser";
import { Donator } from "./../models/user/donator.model";
import { AuthRepository } from "app/ui/repositories/auth.repository";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { FirebaseGateway } from "../gateway/firebase.gateway";

@Injectable()
export class DonatorRepository {
  constructor(
    private db: AngularFireDatabase,
    private parser: DonatorParser,
    private authRepository: AuthRepository
  ) {}

  async list(): Promise<Donator[]> {
    try {
      const gateway = new FirebaseGateway(this.db);
      const items = await gateway.getList("donator");
      return this.parser.parseList(items);
    } catch (error) {
      throw Promise.reject(error);
    }
  }

  async getItem(uid): Promise<Donator> {
    try {
      debugger
      const gateway = new FirebaseGateway(this.db);
      const result = await gateway.getItemByKey("donator", uid);
      console.log(result)
      return Promise.resolve(this.parser.parse(result));
    } catch (error) {
      throw Promise.reject(error);
    }
  }

  public async saveDonator(donator: Donator): Promise<any> {
    try {
      const userFirebase = await this.authRepository.register(
        donator.getRegisterModel()
      );
      const gateway = new FirebaseGateway(this.db);
      await gateway.addCustomItem(
        "userApp",
        donator.getDatabaseModel(),
        userFirebase.user.uid
      );
      await gateway.addCustomItem(
        "donator",
        donator.getUpdateObject(),
        userFirebase.user.uid
      );
      return Promise.resolve(userFirebase.user.uid);
    } catch (error) {
      throw await Promise.reject(error);
    }
  }

  public async updateDonator(donator: Donator): Promise<boolean> {
    try {
      const gateway = new FirebaseGateway(this.db);
      await gateway.updateItem("donator", donator);
      return Promise.resolve(true);
    } catch (error) {
      throw await Promise.reject(error);
    }
  }

  public async deleteDonator(donator: Donator): Promise<any> {
    try {
      const gateway = new FirebaseGateway(this.db);
      await gateway.deleteItem("donator", donator.uid);
      await gateway.deleteItem("userApp", donator.uid);
      return Promise.resolve(true);
    } catch (error) {
      throw await Promise.reject(error);
    }
  }
}
