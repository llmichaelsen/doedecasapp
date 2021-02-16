import { UserType } from 'app/ui/models/user/user-type.enum';
import { UserApp } from 'app/ui/models/user/user-app.model';
import { Address } from './address.model';

export class Donator extends UserApp {
    firstName: string;
    lastName: string;
    address: Address;
    obs: string;

    constructor() {
        super();
        this.type = UserType.Doador;
    }

    getName(): string {
        return this.firstName;
    }

    getFullName(): string {
        return this.firstName + ' ' + this.lastName; 
    }    

    getFullAddress(): string {
        return this.address.getFullAddress(); 
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