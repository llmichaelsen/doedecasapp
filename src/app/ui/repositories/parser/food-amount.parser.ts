
import { AbstractParser } from "./parser";
import { Injectable } from "@angular/core";
import { FoodAmount } from "app/ui/models/food/food-amount";

@Injectable()
export class FoodAmountParser extends AbstractParser<FoodAmount> {

    parse(payload): FoodAmount {
        const food: FoodAmount = new FoodAmount();
        if(!payload) return food;

        const info = payload;

        food.food = info.food;
        food.amount = info.amount;
        return food;
    }
}