import { DonatorService } from './../../services/donator.service';
import { Donator } from '../../models/user/donator.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Address } from 'app/ui/models/user/address.model';
import { AuthService } from 'app/ui/services/auth.service';
import { LoadingService } from 'app/ui/services/loading.service';
import { UserService } from 'app/ui/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-donator.component.html',
  styleUrls: ['./profile-donator.component.scss']
})
export class ProfileDonatorComponent implements OnInit {

  profileForm: FormGroup;
  editModal: NgbModalRef;

  constructor(
    public authServ: AuthService,
    private service: DonatorService,
    private modalService: NgbModal,
    private loadingServ: LoadingService,
    private fb: FormBuilder
  ) { }


  ngOnInit() {

    this.createForm();
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
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

  async successMessage(formDirective: FormGroupDirective): Promise<void> {
    await this.authServ.setUserApp();
    this.createForm();
    formDirective.resetForm();
    this.editModal.close();
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

  openEdit(content): void {
    this.editModal = this.modalService.open(content, { size: 'lg' });
  }

  async deleteAccount(): Promise<void> {
    await this.service.deleteUser(this.user, 'eetsetes')
    await this.authServ.logout()
  }

  get user(): Donator {
    return this.authServ.getUserApp() as Donator;
  }

}
