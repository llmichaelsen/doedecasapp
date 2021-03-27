import { DonationOffer } from '../models/donation/donation-offer';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FirebaseGateway } from '../gateway/firebase.gateway';
import { DonationOfferParser } from './parser/donation.parser';
@Injectable()
export class DonationRequestRepository {
    constructor(
        private db: AngularFireDatabase,
        private donationParser: DonationOfferParser
    ){}

    public async saveDonation(donation): Promise<any> {
        try {
            const gateway = new FirebaseGateway(this.db);
            const result = await gateway.addItem('donation-request', donation);
            return Promise.resolve(result);
        } catch (error) {
            return await Promise.reject(error);
        }
    }

    public async getDonations(): Promise<DonationOffer[]> {
        try {
            const gateway = new FirebaseGateway(this.db);
            const result = await gateway.getList('donation-request')
            return Promise.resolve(this.donationParser.parseList(result));
        } catch (error) {
            return await Promise.reject(error);
        }
    }
}