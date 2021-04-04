import { AuthService } from 'app/ui/services/auth.service';
import { DonatorService } from './../../services/donator.service';
import { Donator } from './../../models/user/donator.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'app/ui/models/user/address.model';
import { LoadingService } from 'app/ui/services/loading.service';
import { UserType } from 'app/ui/models/user/user-type.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  profileForm: FormGroup;

  constructor(
    private donatorServ: DonatorService,
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
      phone: ['', Validators.required],
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

  async onSubmit(): Promise<void> {
    
    if(this.profileForm.invalid){
      return;
    }

    const load = this.loadingServ.show();
    const user = this.createUser();
    this.donatorServ.saveDonator(user)
      .then(()=> this.successMessage())
      .catch(error => console.log(error))
      .finally(() => this.loadingServ.close(load));
  }

  successMessage(): void {
    this.router.navigate(['/'])
  }

  private createUser(): Donator {
    const donator = new Donator();
    const address = new Address();
    donator.type = UserType.Doador;
    donator.firstName = this.profileForm.controls.firstName.value;
    donator.lastName = this.profileForm.controls.lastName.value;
    donator.email = this.profileForm.controls.email.value;
    donator.password = this.profileForm.controls.password.value;
    donator.obs = this.profileForm.controls.obs.value;

    const addressForm = this.profileForm.controls.address as FormGroup;
    address.street = addressForm.controls.street.value;
    address.number = addressForm.controls.number.value;
    address.district = addressForm.controls.district.value;
    address.city = addressForm.controls.city.value;
    donator.address = address;
    return donator;
  }

}
