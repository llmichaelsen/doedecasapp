import { DonationType } from 'app/ui/models/donation/donation';
import { Observable } from 'rxjs';
import { Key } from "../models/user/user-app.model";

export interface IDonationService {
    cancelDonation(donation: DonationType): Promise<void>;
    updateDonation(donation: DonationType): Promise<void>;
    getDonationsByDonator(donator: Key): Promise<Observable<any>>
    getDonationsByInstitution(institution: Key): Promise<Observable<any>>
}