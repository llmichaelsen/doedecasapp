import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FirebaseGateway } from '../gateway/firebase.gateway';
import { Food } from '../models/food/food';
import { FoodParser } from './parser/food.parser';

@Injectable()
export class FoodRepository {

    userId: string;
    items: any = null;

    constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase, private parser: FoodParser) {
        this.afAuth.authState.subscribe(user => {
            if (user) this.userId = user.uid;
        });
    }

    async list(): Promise<Food[]> {
        const gateway = new FirebaseGateway(this.db);
        this.items = await gateway.getList('alimentos');
        return this.parser.parseList(this.items);
    }

}