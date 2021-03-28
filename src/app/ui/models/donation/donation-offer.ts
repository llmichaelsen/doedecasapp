import { Key } from './../user/user-app.model';
import { DeliveryTime } from './delivery-time';
import { DonationStatus } from './donation-status.enum';
import { Donator } from './../user/donator.model';
import { Institution } from './../user/institution.model';
import { WorkingTime } from "../user/working-time.model";
import { Food } from "../food/food";
import { DonationCompletionMotive } from './donation-status-motive.enum';

export class DonationOffer {

  key: Key;
  createdAt: Date = new Date();
  institution: Institution | Key = null;
  donator: Donator | Key;
  amount: number;
  food: Food;
  workingTime: WorkingTime = new WorkingTime();
  deliveryTime: DeliveryTime = new DeliveryTime();
  status: DonationStatus = DonationStatus.Initiated;
  completionMotive: DonationCompletionMotive;

  getUpdateObject() {
    return {
      createdAt: this.createdAt,
      donator: this.donator,
      amount: this.amount,
      food: this.food,
      workingTime: this.workingTime,
      deliveryTime: this.deliveryTime,
      status: this.status,
      institution: this.institution,
    };
  }
}
