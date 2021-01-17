import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Address } from 'app/ui/models/user/address.model';
import { UserType } from 'app/ui/models/user/user-type.enum';
import { UserApp } from 'app/ui/models/user/user-app.model';
import { AuthService } from 'app/ui/services/auth.service';
import { LoadingService } from 'app/ui/services/loading.service';
import { UserService } from 'app/ui/services/user.service';
import * as Rellax from 'rellax';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  user: UserApp;
  editModal: NgbModalRef;

  constructor(
    public authServ: AuthService,
    private userServ: UserService,
    private modalService: NgbModal,
    private loadingServ: LoadingService,
    private fb: FormBuilder
  ) { }


  ngOnInit() {

    this.createForm();

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  createForm(): void {
    this.user = this.authServ.getUserApp();
    this.profileForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      obs: [this.user.obs],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, Validators.required],
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
    this.userServ.updateUser(user)
      .then(()=> this.successMessage(formDirective))
      .catch(error => console.log(error))
      .finally(() => this.loadingServ.close(load));
  }

  async successMessage(formDirective: FormGroupDirective): Promise<void> {
    await this.authServ.setUserApp();
    this.createForm();
    formDirective.resetForm();
    this.editModal.close();
  }

  private createUser(): UserApp {
    const user = new UserApp();
    const address = new Address();
    user.key = this.user.uid;
    user.firstName = this.profileForm.controls.firstName.value;
    user.lastName = this.profileForm.controls.lastName.value;
    user.email = this.profileForm.controls.email.value;
    user.password = this.profileForm.controls.password.value;
    user.obs = this.profileForm.controls.obs.value;
    user.type = UserType.Doador;

    const addressForm = this.profileForm.controls.address as FormGroup;
    address.street = addressForm.controls.street.value;
    address.number = addressForm.controls.number.value;
    address.district = addressForm.controls.district.value;
    address.city = addressForm.controls.city.value;
    user.address = address;
    return user;
  }

  openEdit(content): void {
    this.editModal = this.modalService.open(content, { size: 'lg' });
  }

  async deleteAccount(): Promise<void> {
    await this.userServ.deleteUser(this.user)
    await this.authServ.logout()
  }

}
