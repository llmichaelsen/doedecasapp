import { Observable } from "rxjs";
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

  public getDonationsByDonator(donator: Key): Promise<Observable<any>> {
    try {
      return this.donationRepository.getDonationsByDonator(donator);
    } catch (error) {
      return error;
    }
  }

  public getDonationsByInstitution(institution: Key): Promise<Observable<any>> {
    try {
      return this.donationRepository.getDonationsByInstitution(institution);
    } catch (error) {
      return error;
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
