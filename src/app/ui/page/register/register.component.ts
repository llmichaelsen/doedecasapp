import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'app/ui/models/user/address.model';
import { UserType } from 'app/ui/models/user/user-type.enum';
import { UserApp } from 'app/ui/models/user/user.model';
import { LoadingService } from 'app/ui/services/loading.service';
import { UserService } from 'app/ui/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  profileForm: FormGroup;

  constructor(
    private userServ: UserService,
    private loadingServ: LoadingService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm(): void {
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
      .then(()=> this.successMessage())
      .catch(error => console.log(error))
      .finally(() => this.loadingServ.close(load));
  }

  successMessage(): void {
    this.router.navigate(['/'])
  }

  private createUser(): UserApp {
    const user = new UserApp();
    const address = new Address();
    user.firstName = this.profileForm.controls.firstName.value;
    user.lastName = this.profileForm.controls.lastName.value;
    user.email = this.profileForm.controls.email.value;
    user.password = this.profileForm.controls.password.value;
    user.type = UserType.Doador;
    user.obs = this.profileForm.controls.obs.value;

    const addressForm = this.profileForm.controls.address as FormGroup;
    address.street = addressForm.controls.street.value;
    address.number = addressForm.controls.number.value;
    address.district = addressForm.controls.district.value;
    address.city = addressForm.controls.city.value;
    user.address = address;
    return user;
  }

}
