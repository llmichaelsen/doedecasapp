import { UserType } from "app/ui/models/user/user-type.enum";
import { WorkingTime } from "./working-time.model";
import { Address } from "./address.model";
import { UserApp } from "app/ui/models/user/user-app.model";
import { Food } from "../food/food";

export class Institution extends UserApp {
  name: string;
  cpnj: string;
  description: string;
  address: Address;

  responsibleFirstName: string;
  responsibleLastName: string;
  responsiblePhone: string;
  responsibleRole: string;

  foodNeeded: Food[] = [];
  enableDonation: boolean = false;
  workingTime: WorkingTime = null;

  constructor() {
    super();
    this.type = UserType.Instituiçao;
  }

  getName(): string {
    return this.responsibleFirstName;
  }

  getUpdateObject(): Object {
    return {
      name: this.name,
      cpnj: this.cpnj,
      description: this.description,
      address: this.address,
      responsibleFirstName: this.responsibleFirstName,
      responsibleLastName: this.responsibleLastName,
      responsiblePhone: this.responsiblePhone,
      responsibleRole: this.responsibleRole,
      foodNeeded: this.foodNeeded,
      enableDonation: this.enableDonation,
      workingTime: this.workingTime,
    };
  }
}
