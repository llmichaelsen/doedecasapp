import { Address } from "./address.model";
import { UserType, UserTypeTitle } from "./user-type.enum";

export class UserApp {

    key: string;
    uid: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    address: Address;
    obs: string;
    type: UserType;

    getFullName(): string {
        return this.firstName + ' ' + this.lastName; 
    }

    getTypeName(): UserTypeTitle {
        return UserTypeTitle[this.type];
    }

    getFullAddress(): string {
        return this.address.getFullAdress(); 
    }

    getUpdateObject(): Object {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            address: this.address,
            obs: this.obs
        }
    }
}