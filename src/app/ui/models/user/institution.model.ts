import { FormGroup, Validators, FormBuilder } from '@angular/forms';
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
  workingTime: WorkingTime = new WorkingTime();

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

  getFormGroup(): FormGroup {
    debugger
    const fb = new FormBuilder();
    return fb.group({
      name: [this.name, Validators.required],
      cpnj: [this.name, Validators.required],
      description: [this.description],
      address: fb.group({
        street: [this.address.street],
        number: [this.address.number],
        district: [this.address.district],
        city: [this.address.city],
        uf: [this.address.uf],
      }),
      responsibleFirstName: [this.responsibleFirstName, Validators.required],
      responsibleLastName: [this.responsibleLastName, Validators.required],
      responsiblePhone: [this.responsiblePhone, Validators.required],
      responsibleRole: [this.responsibleRole, Validators.required],
      enableDonation: [this.enableDonation, Validators.required],
      foodNeeded: [this.foodNeeded || []],
      workingTime: fb.group({
        monday: [this.workingTime.monday],
        tuesday: [this.workingTime.tuesday],
        wednesday: [this.workingTime.wednesday],
        thursday: [this.workingTime.thursday],
        friday: [this.workingTime.friday],
        saturday: [this.workingTime.saturday],
        sunday: [this.workingTime.sunday],
        weekEndBegin: [this.workingTime.weekEndBegin],
        weekEndFinal: [this.workingTime.weekEndFinal],
        weekDayBegin: [this.workingTime.weekDayBegin],
        weekDayFinal: [this.workingTime.weekDayFinal],
      })
    });
  }

  createUser(formGroup: FormGroup): Institution {
    const inst = new Institution();
    inst.key = this.uid;
    inst.uid = this.uid;
    inst.name = formGroup.get('name').value;
    inst.cpnj = formGroup.get('cpnj').value;
    inst.description = formGroup.get('description').value;
    inst.address = formGroup.get('address').value;
    inst.responsibleFirstName = formGroup.get('responsibleFirstName').value;
    inst.responsibleLastName = formGroup.get('responsibleLastName').value;
    inst.responsiblePhone = formGroup.get('responsiblePhone').value;
    inst.responsibleRole = formGroup.get('responsibleRole').value;
    inst.enableDonation = formGroup.get('enableDonation').value;
    inst.foodNeeded = formGroup.get('foodNeeded').value;
    inst.workingTime = formGroup.get('workingTime').value;
    return inst;
  }
}
