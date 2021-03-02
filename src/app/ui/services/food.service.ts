import { Injectable } from "@angular/core";
import { Food } from "../models/food/food";
import { FoodRepository } from "../repositories/food.repository";

@Injectable()
export class FoodService {
  constructor(
    private foodRepository: FoodRepository
  ) {}

  public async list(): Promise<Food[]> {
    try {
      const users = await this.foodRepository.list();
      return users;
    } catch (error) {
      throw await Promise.reject(error);
    }
  }

}