import { AbstractParser } from "./parser";
import { Injectable } from "@angular/core";
import { Food } from 'app/ui/models/food/food';

@Injectable()
export class FoodParser extends AbstractParser<Food> {

    parse(payload): Food {
        const food: Food = new Food();
        if(!payload) return food;

        food.id = payload.key;
        food.title = payload.payload.val();
        return food;
    }
}