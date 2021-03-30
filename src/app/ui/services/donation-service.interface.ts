import { DonationType } from 'app/ui/models/donation/donation';
import { Key } from "../models/user/user-app.model";

export interface IDonationService {
    cancelDonation(donation: DonationType): Promise<void>;
    updateDonation(donation: DonationType): Promise<void>;
    getDonationsByDonator(donator: Key): Promise<DonationType[]>
    getDonationsByInstitution(institution: Key): Promise<DonationType[]>
}