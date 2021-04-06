import { UserApp } from 'app/ui/models/user/user-app.model';
import { Donator } from '../user/donator.model';
import { Institution } from '../user/institution.model';
import { UserType } from '../user/user-type.enum';
import { DonationType } from './../donation/donation';
import { Key } from './../user/user-app.model';

export class Notification {
    key: string;
    userApp: Key;
    message: string;
    read: boolean = false;

    getUpdateObject(): Object {
        return this;
    }

    static createFromDonation(donation: DonationType, userApp: UserApp): Notification {
        const not = new Notification();
        not.userApp = userApp.type === UserType.Doador ? (donation.institution as Institution).key : (donation.donator as Donator).key
        not.message = `Uma doação foi concluída ${userApp.type === UserType.Doador ? `pelo doador ${userApp.getName()}` : `pela instituição ${(userApp as Institution).name}`}`
        return not;
    }
}