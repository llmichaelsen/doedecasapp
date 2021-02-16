import { DonatorRepository } from "./../repositories/donator.repository";
import { Donator } from "./../models/user/donator.model";
import { Injectable } from "@angular/core";

@Injectable()
export class DonatorService {
  constructor(
    private repository: DonatorRepository
  ) {}

  public async saveDonator(donator: Donator): Promise<boolean> {
    try {
      const uid = await this.repository.saveDonator(donator);
      return true;
    } catch (error) {
      return error;
    }
  }

  public async getItem(uid: string): Promise<Donator> {
    try {
      const users = await this.repository.getItem(uid);
      return users;
    } catch (error) {
      return error;
    }
  }

  public async list(): Promise<Donator[]> {
    try {
      const users = await this.repository.list();
      return users;
    } catch (error) {
      return error;
    }
  }
}
