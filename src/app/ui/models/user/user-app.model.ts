import { UserType } from 'app/ui/models/user/user-type.enum';

export class UserApp {

    key: string;
    uid: string;
    password: string;
    email: string;
    type: UserType;

    getUserAppModel(): UserApp {
        const user = new UserApp();
        user.type = this.type;
        user.email = this.email;
        user.password = this.password;
        return user;
    }

    getName(): string {
        return '';
    }
}