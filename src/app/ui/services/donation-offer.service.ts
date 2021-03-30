import { IDonationService } from "./donation-service.interface";

import { Key } from "./../models/user/user-app.model";
import { Injectable } from "@angular/core";
import { DonationOffer } from "../models/donation/donation-offer";
import { DonationOfferRepository } from "../repositories/donation-offer.repository";

@Injectable()
export class DonationOfferService implements IDonationService {
  constructor(private donationRepository: DonationOfferRepository) {}

  public async saveDonation(donation): Promise<any> {
    try {
      const rsult = await this.donationRepository.saveDonation(donation);
      return rsult;
    } catch (error) {
      return error;
    }
  }

  public async updateDonation(donation: DonationOffer): Promise<any> {
    try {
      const rsult = await this.donationRepository.updateDonation(donation);
      return rsult;
    } catch (error) {
      return error;
    }
  }

  public async cancelDonation(donation: DonationOffer): Promise<any> {
    try {
      const rsult = await this.donationRepository.cancelDonation(donation);
      return rsult;
    } catch (error) {
      return error;
    }
  }

  public async getDonations(): Promise<DonationOffer[]> {
    try {
      const result = await await this.donationRepository.getDonations();
      return Promise.resolve(result);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public async getDonationsByDonator(donator: Key): Promise<DonationOffer[]> {
    try {
      const result = await await this.donationRepository.getDonationsByDonator(
        donator
      );
      return Promise.resolve(result);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public async getDonationsByInstitution(
    institution: Key
  ): Promise<DonationOffer[]> {
    try {
      const result = await await this.donationRepository.getDonationsByInstitution(
        institution
      );
      return Promise.resolve(result);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public async getInitiatedDonations(): Promise<DonationOffer[]> {
    try {
      const result = await await this.donationRepository.getInitiatedDonations();
      return Promise.resolve(result);
    } catch (error) {
      return await Promise.reject(error);
    }
  }
}
