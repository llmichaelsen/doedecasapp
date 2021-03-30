import { DonationOffer } from 'app/ui/models/donation/donation-offer';
import { DeliveryTime } from "./delivery-time";
import { Institution } from "./../user/institution.model";
import { Key } from "./../user/user-app.model";
import { Donator } from "../user/donator.model";
import { Food } from "../food/food";
import { DonationCompletionMotive } from "./donation-status-motive.enum";
import { DonationStatus } from "./donation-status.enum";
import { DonationRequest } from "./donation-request";
import { Type } from '@angular/core';

export type DonationType = DonationRequest | DonationOffer;

export interface IDonation {
  getType(): Type<DonationType>;
}

export abstract class Donation implements IDonation {
  key: Key;
  createdAt: number = new Date().getTime();
  institution: Institution | Key = null;
  donator: Donator | Key;
  amount: number;
  food: Food;
  deliveryTime: DeliveryTime = new DeliveryTime();
  completionMotive: DonationCompletionMotive = null;
  status: DonationStatus;

  get createdAtDate(): Date {
    return new Date(this.createdAt);
  }

  abstract getType(): Type<DonationType>;
}
