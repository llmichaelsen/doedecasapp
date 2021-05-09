import { DonatorRepository } from "./donator.repository";
import { InstitutionRepository } from "./institution.repository";
import { map } from "rxjs/operators";
import { FoodService } from "./../services/food.service";
import { DonationOfferParser } from "./parser/donation-offer.parser";
import { Key } from "./../models/user/user-app.model";
import { DonationOffer } from "./../models/donation/donation-offer";
import { DonatorParser } from "./parser/donator.parser";
import { DonationStatus } from "./../models/donation/donation-status.enum";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { FirebaseGateway } from "../gateway/firebase.gateway";
import { Observable } from "rxjs";
import { Donator } from "../models/user/donator.model";
@Injectable()
export class DonationOfferRepository {
  constructor(
    private db: AngularFireDatabase,
    private donationParser: DonationOfferParser,
    private donatorParser: DonatorParser,
    private institutionRepository: InstitutionRepository,
    private donatorRepository: DonatorRepository,
    public foodServ: FoodService
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

  public async getDonationsByDonator(donator: Key): Promise<Observable<any>> {
    try {
      const gateway = new FirebaseGateway(this.db);
      const insts = await this.institutionRepository.list();
      return gateway.getListObservable("donation-offer").pipe(
        map((items) =>
          items
            .map((item) => this.donationParser.parse(item.payload))
            .filter((d) => d.donator === donator)
            .map((d) => {
              d.institution = insts.find((i) => i.key === d.institution);
              return d;
            })
            .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
        )
      );
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public async getDonationsByInstitution(
    institution: Key
  ): Promise<Observable<any>> {
    try {
      const gateway = new FirebaseGateway(this.db);
      const donators = await this.donatorRepository.list();
      return gateway.getListObservable("donation-offer").pipe(
        map((items) =>
          items
            .map((item) => this.donationParser.parse(item.payload))
            .filter((d) => d.institution === institution)
            .map((d) => {
              d.donator = donators.find((i) => i.key === d.donator);
              return d;
            })
            .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
        )
      );
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public async updateDonation(
    donation: DonationOffer
  ): Promise<DonationOffer[]> {
    try {
      const gateway = new FirebaseGateway(this.db);
      const result = await gateway.updateItem("donation-offer", donation);
      return Promise.resolve(this.donationParser.parseList(result));
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public async cancelDonation(donation: DonationOffer): Promise<any> {
    try {
      debugger
      const gateway = new FirebaseGateway(this.db);
      const result = await gateway.updateItem("donation-offer", donation);

      if(donation.institution) {
        const newDonation = {...donation};
        newDonation.deliveryTime = null;
        newDonation.institution = null;
        newDonation.status = DonationStatus.Initiated;
        newDonation.donator = (donation.donator as Donator).uid;
        delete newDonation.key;

        const result = await this.saveDonation(newDonation);
      }
      return Promise.resolve(result);
    } catch (error) {
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
