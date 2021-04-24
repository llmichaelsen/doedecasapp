import { DonationStatus } from "./donation-status.enum";
import { Donation, DonationType } from "./donation";
import { Type } from "@angular/core";
import { Donator } from "../user/donator.model";
import { Institution } from "../user/institution.model";

export class DonationRequest extends Donation {
  status: DonationStatus = DonationStatus.Scheduled;

  getType(): Type<DonationType> {
    return DonationRequest;
  }

  getUpdateObject() {
    return {
      createdAt: this.createdAt,
      donator: this.donator instanceof Donator ? this.donator.key : this.donator,
      foodAmount: this.foodAmount,
      deliveryTime: this.deliveryTime,
      status: this.status,
      institution: this.institution instanceof Institution ? this.institution.key : this.institution,
      completionMotive: this.completionMotive,
    };
  }
}
