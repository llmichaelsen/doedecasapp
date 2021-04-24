import { DonationStatus } from "./donation-status.enum";
import { WorkingTime } from "../user/working-time.model";
import { Donation, DonationType } from "./donation";
import { Type } from "@angular/core";
import { Donator } from "../user/donator.model";
import { Institution } from "../user/institution.model";

export class DonationOffer extends Donation {
  workingTime: WorkingTime = new WorkingTime();
  status: DonationStatus = DonationStatus.Initiated;

  getUpdateObject() {
    return {
      createdAt: this.createdAt,
      donator: this.donator instanceof Donator ? this.donator.key : this.donator,
      foodAmount: this.foodAmount,
      workingTime: this.workingTime,
      deliveryTime: this.deliveryTime,
      status: this.status,
      institution: this.institution instanceof Institution ? this.institution.key : this.institution,
      completionMotive: this.completionMotive
    };
  }

  getType(): Type<DonationType> {
    return DonationOffer;
}
}
