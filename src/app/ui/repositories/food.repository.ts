import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { FirebaseGateway } from "../gateway/firebase.gateway";
import { Food } from "../models/food/food";
import { FoodParser } from "./parser/food.parser";

@Injectable()
export class FoodRepository {
  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private parser: FoodParser
  ) {}

  async list(): Promise<Food[]> {
    try {
      const gateway = new FirebaseGateway(this.db);
      const result = await gateway.getList("alimentos");
      return this.parser.parseList(result);
    } catch (error) {
      throw error;
    }
  }
}
