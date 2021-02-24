import { UserType } from 'app/ui/models/user/user-type.enum';

export class UserApp {

    key: string;
    uid: string;
    password: string;
    email: string;
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
}