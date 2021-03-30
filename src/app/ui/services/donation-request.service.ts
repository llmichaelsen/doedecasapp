import { IDonationService } from "./donation-service.interface";
import { DonationRequest } from "app/ui/models/donation/donation-request";
import { Key } from "./../models/user/user-app.model";

import { Injectable } from "@angular/core";
import { DonationRequestRepository } from "../repositories/donation-request.repository";
import { AuthService } from "./auth.service";

@Injectable()
export class DonationRequestService implements IDonationService {
  constructor(
    private donationRepository: DonationRequestRepository,
    private authServ: AuthService
  ) {}

  public async saveDonation(donation: DonationRequest): Promise<any> {
    try {
      const rsult = await this.donationRepository.saveDonation(donation);
      return rsult;
    } catch (error) {
      return error;
    }
  }

  public async updateDonation(donation: DonationRequest): Promise<any> {
    try {
      const rsult = await this.donationRepository.updateDonation(donation);
      return rsult;
    } catch (error) {
      return error;
    }
  }

  public async cancelDonation(donation: DonationRequest): Promise<any> {
    try {
      const rsult = await this.donationRepository.cancelDonation(donation);
      return rsult;
    } catch (error) {
      return error;
    }
  }

  public async getDonations(): Promise<DonationRequest[]> {
    try {
      const result = await await this.donationRepository.getDonations();
      return Promise.resolve(result);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public async getDonationsByDonator(donator: Key): Promise<DonationRequest[]> {
    try {
      const result = await await this.donationRepository.getDonationsByDonator(
        donator
      );
      return Promise.resolve(result);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public async getDonationsByInstitution(institution: Key): Promise<DonationRequest[]> {
    try {
      const result = await await this.donationRepository.getDonationsByInstitution(
        institution
      );
      return Promise.resolve(result);
    } catch (error) {
      return await Promise.reject(error);
    }
  }
}
