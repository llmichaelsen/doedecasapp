import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { UserType } from "app/ui/models/user/user-type.enum";
import { WorkingTime } from "./working-time.model";
import { Address } from "./address.model";
import { UserApp } from "app/ui/models/user/user-app.model";

export class Institution extends UserApp {
  name: string;
  cpnj: string;
  description: string;
  address: Address;

  responsibleFirstName: string;
  responsibleLastName: string;
  responsiblePhone: string;
  responsibleRole: string;

  foodNeeded: string[] = [];
  enableDonation: boolean = false;
  workingTime: WorkingTime = new WorkingTime();

  constructor() {
    super();
    this.type = UserType.Instituiçao;
  }

  getName(): string {
    return this.responsibleFirstName;
  }

  getFullAddress(): string  {
    return this.address.getFullAddress();
  }

  getUpdateObject(): Object {
    return {
      name: this.name,
      cpnj: this.cpnj,
      description: this.description,
      phone: this.phone,
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

  getFormGroupEdit(): FormGroup {
    const fb = new FormBuilder();
    return fb.group({
      name: [this.name, Validators.required],
      cpnj: [this.cpnj, Validators.required],
      description: [this.description],
      phone: [this.phone, Validators.required],
      address: fb.group({
        street: [this.address.street, Validators.required],
        number: [this.address.number, Validators.required],
        district: [this.address.district, Validators.required],
        city: [this.address.city, Validators.required],
        uf: [this.address.uf, Validators.required],
      }),
      responsibleFirstName: [this.responsibleFirstName, Validators.required],
      responsibleLastName: [this.responsibleLastName, Validators.required],
      responsiblePhone: [this.responsiblePhone, Validators.required],
      responsibleRole: [this.responsibleRole, Validators.required],
    });
  }

  getFormGroupConfig(): FormGroup {
    const fb = new FormBuilder();
    return fb.group({
      enableDonation: [this.enableDonation, Validators.required],
      foodNeeded: [this.foodNeeded || []],
      workingTime: this.workingTime.getFormGroup(),
    });
  }

  createUserEdit(formGroup: FormGroup): Institution {
    const inst = new Institution();
    inst.key = this.uid;
    inst.uid = this.uid;
    inst.name = formGroup.get("name").value;
    inst.cpnj = formGroup.get("cpnj").value;
    inst.description = formGroup.get("description").value;
    inst.phone = formGroup.get("phone").value;
    inst.address = formGroup.get("address").value;
    inst.responsibleFirstName = formGroup.get("responsibleFirstName").value;
    inst.responsibleLastName = formGroup.get("responsibleLastName").value;
    inst.responsiblePhone = formGroup.get("responsiblePhone").value;
    inst.responsibleRole = formGroup.get("responsibleRole").value;
    inst.enableDonation = this.enableDonation;
    inst.foodNeeded = this.foodNeeded;
    inst.workingTime = this.workingTime;

    return inst;
  }

  createUserConfig(formGroup: FormGroup): Institution {
    const inst = this;
    inst.enableDonation = formGroup.get("enableDonation").value;
    inst.foodNeeded = formGroup.get("foodNeeded").value;
    inst.workingTime = formGroup.get("workingTime").value;
    return inst;
  }
}
