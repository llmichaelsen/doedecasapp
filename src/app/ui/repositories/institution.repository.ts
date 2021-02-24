import { AuthRepository } from "app/ui/repositories/auth.repository";
import { Institution } from "./../models/user/institution.model";
import { InstitutionParser } from "./parser/institution.parser";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { FirebaseGateway } from "../gateway/firebase.gateway";

@Injectable()
export class InstitutionRepository {
  constructor(
    private db: AngularFireDatabase,
    private parser: InstitutionParser,
    private authRepository: AuthRepository
  ) {}

  async list(): Promise<Institution[]> {
    try {
      const gateway = new FirebaseGateway(this.db);
      const items = await gateway.getList("institution");
      console.log(items)
      return this.parser.parseList(items);
    } catch (error) {
      throw Promise.reject(error);
    }
  }

  async getItem(uid): Promise<Institution> {
    try {
      const gateway = new FirebaseGateway(this.db);
      const result = await gateway.getItemByKey("institution", uid);
      return Promise.resolve(this.parser.parse(result));
    } catch (error) {
      throw Promise.reject(error);
    }
  }

  public async saveInstitution(institution: Institution): Promise<string> {
    try {
      const userFirebase = await this.authRepository.register(
        institution.getRegisterModel()
      );
      const gateway = new FirebaseGateway(this.db);
      const result = await gateway.addCustomItem(
        "userApp",
        institution.getDatabaseModel(),
        userFirebase.user.uid
      );
      const result2 = await gateway.addCustomItem(
        "institution",
        institution.getUpdateObject(),
        userFirebase.user.uid
      );
      return userFirebase.user.uid;
    } catch (error) {
      throw Promise.reject(error);
    }
  }
}
