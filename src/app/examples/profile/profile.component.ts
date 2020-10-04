import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from 'app/ui/models/user/address.model';
import { UserType } from 'app/ui/models/user/user-type.enum';
import { UserApp } from 'app/ui/models/user/user.model';
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
  zoom: number = 14;
  lat: number = 44.445248;
  lng: number = 26.099672;
  styles: any[] = [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }];
  data: Date = new Date();
  focus;
  focus1;
  profileForm: FormGroup;
  user: UserApp;

  constructor(
    public authServ: AuthService,
    private userServ: UserService,
    private modalService: NgbModal,
    private loadingServ: LoadingService,
    private fb: FormBuilder
  ) { }


  ngOnInit() {

    this.user = this.authServ.getUserApp();

    this.createForm();
    var rellaxHeader = new Rellax('.rellax-header');

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

  successMessage(formDirective: FormGroupDirective): void {
    this.profileForm.reset();
    formDirective.resetForm();
  }

  private createUser(): UserApp {
    const user = new UserApp();
    const address = new Address();
    user.key = this.user.key;
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

  openEdit(content): void {
    this.modalService.open(content, { size: 'lg' });
  }

}
