import { InstitutionRepository } from './../repositories/institution.repository';
import { DonatorRepository } from './../repositories/donator.repository';
import { Injectable } from "@angular/core";
import { UserApp } from "app/ui/models/user/user-app.model";
import { UserType } from "../models/user/user-type.enum";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserService {
  constructor(
    private donatorRepository: DonatorRepository,
    private institutionRepository: InstitutionRepository,
    private userRepository: UserRepository
  ) {}


  public async getUser(uid): Promise<UserApp> {
    try {
      let userApp = await this.userRepository.getUser(uid);
      if(userApp.type === UserType.Doador) userApp = await this.donatorRepository.getItem(uid);
      if(userApp.type === UserType.Instituiçao) userApp = await this.institutionRepository.getItem(uid);
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

}
