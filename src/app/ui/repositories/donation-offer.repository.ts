import { DonationOffer } from './../models/donation/donation-offer';
import { DonatorParser } from "./parser/donator.parser";
import { DonationStatus } from "./../models/donation/donation-status.enum";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { FirebaseGateway } from "../gateway/firebase.gateway";
import { DonationOfferParser } from "./parser/donation.parser";
@Injectable()
export class DonationOfferRepository {
  constructor(
    private db: AngularFireDatabase,
    private donationParser: DonationOfferParser,
    private donatorParser: DonatorParser
  ) {}

  public async saveDonation(donation): Promise<any> {
    try {
      const gateway = new FirebaseGateway(this.db);
      const result = await gateway.addItem("donation-offer", donation);
      return Promise.resolve(result);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public async getDonations(): Promise<DonationOffer[]> {
    try {
      const gateway = new FirebaseGateway(this.db);
      const result = await gateway.getList("donation-offer");
      return Promise.resolve(this.donationParser.parseList(result));
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public async updateDonation(donation: DonationOffer): Promise<DonationOffer[]> {
    try {
      const gateway = new FirebaseGateway(this.db);
      const result = await gateway.updateItem("donation-offer", donation);
      debugger
      return Promise.resolve(this.donationParser.parseList(result));
    } catch (error) {
      debugger
      return await Promise.reject(error);
    }
  }

  public async getInitiatedDonations(): Promise<DonationOffer[]> {
    try {
      const gateway = new FirebaseGateway(this.db);
      let donations = this.donationParser
        .parseList(await gateway.getList("donation-offer"))
        .filter((d) => d.status === DonationStatus.Initiated);
      const donators = this.donatorParser.parseList(
        await gateway.getList("donator")
      );
      donations = donations.map((donation) => {
        donation.donator = donators.find(
          (donator) => donator.uid === donation.donator
        );
        return donation;
      });
      return Promise.resolve(donations);
    } catch (error) {
      return await Promise.reject(error);
    }
  }
}
