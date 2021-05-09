import { AuthService } from 'app/ui/services/auth.service';
import { DonatorRepository } from "./../repositories/donator.repository";
import { Donator } from "./../models/user/donator.model";
import { Injectable } from "@angular/core";

@Injectable()
export class DonatorService {
  constructor(private repository: DonatorRepository, private authService: AuthService) {}

  public async saveDonator(donator: Donator): Promise<boolean> {
    try {
      const uid = await this.repository.saveDonator(donator);
      return true;
    } catch (error) {
      throw error;
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

  public async updateDonator(donator: Donator): Promise<any> {
    try {
      const result = await this.repository.updateDonator(donator);
      return result;
    } catch (error) {
      return error;
    }
  }

  public async deleteUser(donator: Donator, password): Promise<boolean> {
    try {
      await this.authService.deleteUser(password);
      return await this.repository.deleteDonator(donator);
    } catch (error) {
      throw Promise.reject(error);      
    }
  }
}
