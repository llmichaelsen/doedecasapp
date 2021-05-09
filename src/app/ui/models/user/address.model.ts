export class Address {
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  uf: string;

  getFullAddress(): string {
    return `${this.street}, ${this.number} ${
      this.complement ? " - " + this.complement : ""
    } - ${this.district}, ${this.city} - ${this.uf}`;
  }
}
