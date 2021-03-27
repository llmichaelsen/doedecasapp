
import { Injectable } from '@angular/core';
import { DonationOffer } from '../models/donation/donation-offer';
import { DonationRequest } from '../models/donation/donation-request';
import { DonationRequestRepository } from '../repositories/donation-request.repository';
import { AuthService } from './auth.service';

@Injectable()
export class DonationRequestService {

    constructor(
        private donationRepository: DonationRequestRepository,
        private authServ: AuthService
    ){}

    public async saveDonation(donation: DonationRequest): Promise<any> {
        try {
            const rsult = await this.donationRepository.saveDonation(donation);
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

}