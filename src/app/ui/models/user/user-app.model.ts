import { Masks } from './../../../utils/masks';
import { UserType } from 'app/ui/models/user/user-type.enum';

export type Key = string;

export class UserApp {

    key: Key;
    uid: Key;
    password: string;
    email: string;
    phone: string = '';
    type: UserType;

    getRegisterModel(): UserApp {
        const user = new UserApp();
        user.email = this.email;
        user.password = this.password;
        return user;
    }

    getDatabaseModel(): UserApp {
        const user = new UserApp();
        user.type = this.type;
        user.email = this.email;
        return user;
    }

    getName(): string {
        return '';
    }

    getMaskedPhone(): string {
        return Masks.cellphoneMask(this.phone);
    }
}