import { WorkingTimeParser } from './working-time.parser';
import { DonationOffer } from '../../models/donation/donation-offer';
import { AbstractParser } from "./parser";
import { Injectable } from "@angular/core";

@Injectable()
export class DonationOfferParser extends AbstractParser<DonationOffer> {

    constructor(
        private wtParser: WorkingTimeParser,
    ){
        super();
    }
    
    parse(payload): DonationOffer {
        const donation: DonationOffer = new DonationOffer();
        if(!payload) return donation;

        const data = payload.val();

        donation.key = payload.key;
        donation.institution = data.institution;
        donation.donator = data.donator;
        donation.createdAt = new Date(data.createdAt);
        donation.amount = data.amount;
        donation.food = data.food;
        donation.deliveryTime = data.deliveryTime;
        donation.status = data.status;
        donation.completionMotive = data.completionMotive;
        donation.workingTime = this.wtParser.parse(data.workingTime);
        return donation;
    }
}