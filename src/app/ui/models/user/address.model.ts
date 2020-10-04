

export class Address {

    street: string;
    number: string;
    district: string;
    city: string;

    getFullAdress() :string {
        return `${this.street}, ${this.number}, ${this.district} - ${this.city}`;
    }
}