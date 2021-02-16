import { InstitutionService } from './institution.service';
import { DonatorService } from './donator.service';
import { Injectable } from "@angular/core";
import { UserApp } from "app/ui/models/user/user-app.model";
import { UserType } from "../models/user/user-type.enum";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserService {
  constructor(
    private donatorService: DonatorService,
    private institutionService: InstitutionService,
    private userRepository: UserRepository
  ) {}

  public async getUsers(): Promise<UserApp[]> {
    const users = await this.userRepository.getUsers();
    return users;
  }

  public async getUser(uid): Promise<UserApp> {
    try {
      let userApp = await this.userRepository.getUser(uid);
      if(userApp.type === UserType.Doador) userApp = await this.donatorService.getItem(uid);
      if(userApp.type === UserType.Instituiçao) userApp = await this.institutionService.getItem(uid);
      return userApp;
    } catch (error) {
      return error;
    }
  }

  public async getUseById(uid): Promise<UserApp> {
    try {
      return await this.userRepository.getUser(uid);
    } catch (error) {
      return error;
    }
  }

  public async updateUser(user: UserApp): Promise<any> {
    try {
      const result = await this.userRepository.updateUser(user);
      return result;
    } catch (error) {
      return error;
    }
  }

  public async deleteUser(user): Promise<UserApp[]> {
    return await this.userRepository.deleteUser(user);
  }
}
