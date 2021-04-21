import { InstitutionRepository } from './institution.repository';
import { DonationRequest } from './../models/donation/donation-request';
import { DonationRequestParser } from './parser/donation-request.parser';
import { Key } from "./../models/user/user-app.model";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from "rxjs/operators";
import { FirebaseGateway } from "../gateway/firebase.gateway";
import { DonatorRepository } from './donator.repository';
import { Observable } from 'rxjs';
@Injectable()
export class DonationRequestRepository {
  constructor(
    private db: AngularFireDatabase,
    private donationParser: DonationRequestParser,
    private institutionRepository: InstitutionRepository,
    private donatorRepository: DonatorRepository,
  ) {}

  public async saveDonation(donation): Promise<any> {
    try {
      const gateway = new FirebaseGateway(this.db);
      const result = await gateway.addItem("donation-request", donation);
      return Promise.resolve(result);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public async getDonations(): Promise<DonationRequest[]> {
    try {
      const gateway = new FirebaseGateway(this.db);
      const result = await gateway.getList("donation-request");
      return Promise.resolve(this.donationParser.parseList(result));
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public async updateDonation(donation: DonationRequest): Promise<any> {
    try {
      const gateway = new FirebaseGateway(this.db);
      const result = await gateway.updateItem("donation-request", donation);
      return Promise.resolve(result);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public async cancelDonation(donation: DonationRequest): Promise<any> {
    try {
      const gateway = new FirebaseGateway(this.db);
      const result = await gateway.updateItem("donation-request", donation);
      return Promise.resolve(result);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public async getDonationsByDonator(donator: Key): Promise<Observable<any>> {
    try {
      const gateway = new FirebaseGateway(this.db);
      const insts = await this.institutionRepository.list();
      return gateway
        .getListObservable('donation-request')
        .pipe(
          map(items => items
              .map(item => this.donationParser.parse(item.payload))
              .filter(d => d.donator === donator)
              .map(d => {
                d.institution = insts.find((i) => i.key === d.institution);
                return d;
              })
              .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
          )
        )
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
      return gateway.getListObservable("donation-request").pipe(
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
}
