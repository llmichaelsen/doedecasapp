
import { Injectable } from '@angular/core';
import { DonationOffer } from '../models/donation/donation-offer';
import { DonationOfferRepository } from '../repositories/donation-offer.repository';
import { AuthService } from './auth.service';

@Injectable()
export class DonationOfferService {

    constructor(
        private donationRepository: DonationOfferRepository,
        private authServ: AuthService
    ){}

    public async saveDonation(donation): Promise<any> {
        try {
            const rsult = await this.donationRepository.saveDonation(donation);
            return rsult;
        } catch (error) {
            return error;
        }         
    }
    
    public async updateDonation(donation): Promise<any> {
        try {
            const rsult = await this.donationRepository.updateDonation(donation);
            return rsult;
        } catch (error) {
            return error;
        }         
    }

    public async getDonations(): Promise<DonationOffer[]> {
        try {
            const user = this.authServ.getUserApp()
            const result = await (await this.donationRepository.getDonations());
            return Promise.resolve(result);
        } catch (error) {
            return await Promise.reject(error);
        }
    }

    public async getInitiatedDonations(): Promise<DonationOffer[]> {
        try {
            const result = await (await this.donationRepository.getInitiatedDonations());
            return Promise.resolve(result);
        } catch (error) {
            return await Promise.reject(error);
        }
    }

    

}