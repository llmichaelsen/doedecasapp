

export class Address {

    street: string;
    number: string;
    district: string;
    city: string;
    uf: string;

    getFullAddress() :string {
        return `${this.street}, ${this.number}, ${this.district}, ${this.city} - ${this.uf}`;
    }
}