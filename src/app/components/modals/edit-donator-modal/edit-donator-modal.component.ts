import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { DonatorService } from '../../../ui/services/donator.service';
import { AuthService } from '../../../ui/services/auth.service';
import { Address } from '../../../ui/models/user/address.model';
import { Donator } from '../../../ui/models/user/donator.model';
import { LoadingService } from '../../../ui/services/loading.service';
import { FormGroup, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-donator-modal',
  templateUrl: './edit-donator-modal.component.html',
  styleUrls: ['./edit-donator-modal.component.css']
})
export class EditDonatorModalComponent implements OnInit {
  
  profileForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditDonatorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private loadingServ: LoadingService,
    public authServ: AuthService,
    private service: DonatorService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.profileForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      obs: [this.user.obs],
      address: this.fb.group({
        street: [this.user.address.street],
        number: [this.user.address.number],
        district: [this.user.address.district],
        city: [this.user.address.city]
      })
    });
  }

  async onSubmit(formDirective: FormGroupDirective): Promise<void> {
    if(this.profileForm.invalid){
      return;
    }

    const load = this.loadingServ.show();
    const user = this.createUser();
    this.service.updateDonator(user)
      .then(()=> this.successMessage(formDirective))
      .catch(error => console.log(error))
      .finally(() => this.loadingServ.close(load));
  }

  close(success: boolean): void {
    this.dialogRef.close(success);
  }

  async successMessage(formDirective: FormGroupDirective): Promise<void> {
    await this.authServ.setUserApp();
    this.createForm();
    formDirective.resetForm();
    this.close(true)
  }

  private createUser(): Donator {
    const user = new Donator();
    const address = new Address();
    user.key = this.user.uid;
    user.firstName = this.profileForm.controls.firstName.value;
    user.lastName = this.profileForm.controls.lastName.value;
    user.obs = this.profileForm.controls.obs.value;

    const addressForm = this.profileForm.controls.address as FormGroup;
    address.street = addressForm.controls.street.value;
    address.number = addressForm.controls.number.value;
    address.district = addressForm.controls.district.value;
    address.city = addressForm.controls.city.value;
    user.address = address;
    return user;
  }

  get user(): Donator {
    return this.authServ.getUserApp() as Donator;
  }

}
