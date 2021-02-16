import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/ui/services/user.service';
import { UserApp } from 'app/ui/models/user/user-app.model';
import { Address } from 'app/ui/models/user/address.model';
import { FormGroup, FormBuilder, Validators, Form, FormGroupDirective } from '@angular/forms';
import { LoadingService } from 'app/ui/services/loading.service';
import { UserType } from 'app/ui/models/user/user-type.enum';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
/*
  profileForm: FormGroup;

  constructor(
    private userServ: UserService,
    private loadingServ: LoadingService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      obs: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address: this.fb.group({
        street: [''],
        number: [''],
        district: [''],
        city: ['']
      })
    });
  }

  async onSubmit(formDirective: FormGroupDirective): Promise<void> {
    
    if(this.profileForm.invalid){
      return;
    }

    const load = this.loadingServ.show();
    const user = this.createUser();
    this.userServ.saveUser(user)
      .then(()=> this.successMessage(formDirective))
      .catch(error => console.log(error))
      .finally(() => this.loadingServ.close(load));
  }

  successMessage(formDirective: FormGroupDirective): void {
    this.profileForm.reset();
    formDirective.resetForm();
  }

  private createUser(): UserApp {
    const user = new UserApp();
    const address = new Address();
    user.firstName = this.profileForm.controls.firstName.value;
    user.lastName = this.profileForm.controls.lastName.value;
    user.email = this.profileForm.controls.email.value;
    user.password = this.profileForm.controls.password.value;
    user.type = UserType.Doador;

    const addressForm = this.profileForm.controls.address as FormGroup;
    address.street = addressForm.controls.street.value;
    address.number = addressForm.controls.number.value;
    address.district = addressForm.controls.district.value;
    address.city = addressForm.controls.city.value;
    user.address = address;
    return user;
  }
*/
}
