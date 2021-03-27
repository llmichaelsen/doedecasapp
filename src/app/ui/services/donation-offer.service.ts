
import { Injectable } from '@angular/core';
import { DonationOffer } from '../models/donation/donation-offer';
import { DonationOfferRepository } from '../repositories/donation-offer.repository';
import { AuthService } from './auth.service';

@Injectable()
export class DonationOfferService {

    constructor(
        private userRepository: DonationOfferRepository,
        private authServ: AuthService
    ){}

    public async saveDonation(donation): Promise<any> {
        try {
            const rsult = await this.userRepository.saveDonation(donation);
            return rsult;
        } catch (error) {
            return error;
        }         
    }

    public async getDonations(): Promise<DonationOffer[]> {
        try {
            const user = this.authServ.getUserApp()
            const result = await (await this.userRepository.getDonations());
            return Promise.resolve(result);
        } catch (error) {
            return await Promise.reject(error);
        }
    }

}