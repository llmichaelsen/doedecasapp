import { InstitutionRepository } from "./../repositories/institution.repository";
import { Institution } from "./../models/user/institution.model";
import { Injectable } from "@angular/core";

@Injectable()
export class InstitutionService {
  constructor(
    private institutionRepository: InstitutionRepository
  ) {}

  public async saveInstitution(institution: Institution): Promise<boolean> {
    try {
      const uid = await this.institutionRepository.saveInstitution(institution);
      return true;
    } catch (error) {
      throw await Promise.reject(error);
    }
  }

  public async getItem(uid: string): Promise<Institution> {
    try {
      const users = await this.institutionRepository.getItem(uid);
      return users;
    } catch (error) {
      throw await Promise.reject(error);
    }
  }

  public async list(): Promise<Institution[]> {
    try {
      const users = await this.institutionRepository.list();
      return users;
    } catch (error) {
      throw await Promise.reject(error);
    }
  }

  public async getEnabledInstitutions(): Promise<Institution[]> {
    try {
      const insts = await this.institutionRepository.list();
      return insts.filter(item => item.enableDonation);
    } catch (error) {
      throw await Promise.reject(error);
    }
  }

  public async updateInstitution(inst: Institution): Promise<any> {
    try {
      const result = await this.institutionRepository.updateInstitution(inst);
      return result;
    } catch (error) {
      return error;
    }
  }
}
