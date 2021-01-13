import { Injectable } from '@angular/core';
import { Donation } from '../models/donation/donation';
import { DonationRepository } from '../repositories/donation.repository';
import { AuthService } from './auth.service';

@Injectable()
export class DonationService {

    constructor(
        private userRepository: DonationRepository,
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

    public async getDonations(): Promise<Donation[]> {
        try {
            const user = this.authServ.getUserApp()
            const result = await (await this.userRepository.getDonations()).filter(el => el.doador.uid === user.uid );
            return Promise.resolve(result);
        } catch (error) {
            return await Promise.reject(error);
        }
    }

}