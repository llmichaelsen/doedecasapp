import { Key } from './../user/user-app.model';
import { DonationStatus } from './donation-status.enum';
import { Institution } from './../user/institution.model';
import { Donator } from './../user/donator.model';
import { DeliveryTime } from './delivery-time';
import { Food } from "../food/food";
import { DonationCompletionMotive } from './donation-status-motive.enum';

export class DonationRequest {

    createdAt: Date = new Date();
    food: Food;
    amount: number;
    deliveryTime: DeliveryTime = new DeliveryTime();
    donator: Donator | Key;
    institution: Institution | Key;
    status: DonationStatus = DonationStatus.Pending;
    completionMotive: DonationCompletionMotive = null;
}