import { DonationRequest } from './../../models/donation/donation-request';
import { AbstractParser } from "./parser";
import { Injectable } from "@angular/core";

@Injectable()
export class DonationRequestParser extends AbstractParser<DonationRequest> {

    
    parse(payload): DonationRequest {
        const donation: DonationRequest = new DonationRequest();
        if(!payload) return donation;

        const data = payload.val();

        donation.key = payload.key;
        donation.institution = data.institution || null;
        donation.donator = data.donator;
        donation.createdAt = data.createdAt;
        donation.amount = data.amount;
        donation.food = data.food;
        donation.deliveryTime = data.deliveryTime || null;
        donation.status = data.status;
        donation.completionMotive = data.completionMotive || null;
        return donation;
    }
}