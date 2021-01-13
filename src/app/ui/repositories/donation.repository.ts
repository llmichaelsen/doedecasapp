import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FirebaseGateway } from '../gateway/firebase.gateway';
import { Donation } from '../models/donation/donation';
import { DonationParser } from './parser/donation.parser';

@Injectable()
export class DonationRepository {
    constructor(
        private db: AngularFireDatabase,
        private donationParser: DonationParser
    ){}

    public async saveDonation(donation): Promise<any> {
        try {
            const gateway = new FirebaseGateway(this.db);
            const result = await gateway.addItem('donation', donation);
            return Promise.resolve(result);
        } catch (error) {
            return await Promise.reject(error);
        }
    }

    public async getDonations(): Promise<Donation[]> {
        try {
            const gateway = new FirebaseGateway(this.db);
            const result = await gateway.getList('donation')
            return Promise.resolve(this.donationParser.parseList(result));
        } catch (error) {
            return await Promise.reject(error);
        }
    }
}