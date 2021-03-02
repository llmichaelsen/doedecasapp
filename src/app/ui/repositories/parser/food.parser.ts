import { AbstractParser } from "./parser";
import { Injectable } from "@angular/core";
import { Food } from 'app/ui/models/food/food';

@Injectable()
export class FoodParser extends AbstractParser<Food> {

    parse(payload): Food {
        const food: Food = new Food();
        if(!payload) return food;

        const info = payload.val();

        food.id = payload.key;
        food.title = info;
        return food;
    }
}