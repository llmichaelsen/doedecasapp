import { DonationRequest } from './../../models/donation/donation-request';
import { AbstractParser } from "./parser";
import { Injectable } from "@angular/core";
import { FoodAmountParser } from './food-amount.parser';

@Injectable()
export class DonationRequestParser extends AbstractParser<DonationRequest> {

    foodAmountParser = new FoodAmountParser();
    
    parse(payload): DonationRequest {
        const donation: DonationRequest = new DonationRequest();
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
        return donation;
    }
}