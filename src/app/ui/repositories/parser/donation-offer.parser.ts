import { WorkingTimeParser } from './working-time.parser';
import { DonationOffer } from '../../models/donation/donation-offer';
import { AbstractParser } from "./parser";
import { Injectable } from "@angular/core";
import { FoodAmountParser } from './food-amount.parser';

@Injectable()
export class DonationOfferParser extends AbstractParser<DonationOffer> {

    foodAmountParser = new FoodAmountParser();

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
        donation.institution = data.institution || null;
        donation.donator = data.donator;
        donation.createdAt = data.createdAt;
        donation.foodAmount = this.foodAmountParser.parseList(data.foodAmount);
        donation.deliveryTime = data.deliveryTime || null;
        donation.status = data.status;
        donation.completionMotive = data.completionMotive || null;
        donation.workingTime = this.wtParser.parse(data.workingTime);
        return donation;
    }
}