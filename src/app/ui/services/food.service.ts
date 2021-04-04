import { EventEmitter, Injectable } from "@angular/core";
import { Food } from "../models/food/food";
import { FoodRepository } from "../repositories/food.repository";

@Injectable({
  providedIn: "root",
})
export class FoodService {
  constructor(private foodRepository: FoodRepository) {}
  private foods: Food[] = [];
  private foodEmitter: EventEmitter<Food[]> = new EventEmitter<Food[]>();

  public async initServ(): Promise<void> {
    this.foods = await this.foodRepository.list();
    this.foodEmitter.emit(this.foods);
  }

  public async getFoods(): Promise<Food[]> {
    if (this.foods) return this.foods;

    return await this.waitingForFoods();
  }

  private async waitingForFoods(): Promise<Food[]> {
    return new Promise((resolve, reject) => {
      this.foodEmitter.subscribe(
        (foods) => resolve(foods),
        (error) => reject(error)
      );
    });
  }

  getFoodName(id: string): string {
    return this.foods.find((f) => f.id === id).title;
  }

  public async list(): Promise<Food[]> {
    try {
      const users = await this.foodRepository.list();
      return users;
    } catch (error) {
      throw await Promise.reject(error);
    }
  }
}
