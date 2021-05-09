import { DonatorService } from "./../../services/donator.service";
import { Donator } from "./../../models/user/donator.model";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Address } from "app/ui/models/user/address.model";
import { LoadingService } from "app/ui/services/loading.service";
import { UserType } from "app/ui/models/user/user-type.enum";
import { MessageModalComponent } from "app/components/modals/message-modal/message-modal.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { estados } from "app/utils/estados.array";
import { AlertService } from "app/ui/services/alert.service";
import { AlertMessages } from "app/ui/models/alert/alert-messages.enum";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  profileForm: FormGroup;
  messageModal: MatDialogRef<MessageModalComponent>;

  constructor(
    private donatorServ: DonatorService,
    private loadingServ: LoadingService,
    private fb: FormBuilder,
    private alertServ: AlertService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.profileForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      obs: [""],
      phone: ["", [Validators.required, Validators.minLength(15)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      address: this.fb.group({
        street: ["", Validators.required],
        number: ["", Validators.required],
        complement: [""],
        district: ["", Validators.required],
        city: ["", Validators.required],
        uf: ["", Validators.required],
      }),
    });
  }

  async onSubmit(): Promise<void> {
    if (this.profileForm.invalid) {
      return;
    }

    const load = this.loadingServ.show();
    const user = this.createUser();
    this.donatorServ
      .saveDonator(user)
      .then(() => this.successMessage())
      .catch((error) => this.alertServ.openError(AlertMessages[error.code]))
      .finally(() => this.loadingServ.close(load));
  }

  successMessage(): void {
    this.router.navigate(["/"]);
    this.openMessageModal();
  }

  openMessageModal() {
    this.messageModal = this.dialog.open(MessageModalComponent, {
      width: "500px",
      data: {
        type: "success",
        text:
          "Agora que está cadastrado, você pode encontrar instituições e começar a doar.",
      },
    });
  }

  private createUser(): Donator {
    const donator = new Donator();
    const address = new Address();
    donator.type = UserType.Doador;
    donator.firstName = this.profileForm.controls.firstName.value;
    donator.lastName = this.profileForm.controls.lastName.value;
    donator.email = this.profileForm.controls.email.value;
    donator.phone = this.profileForm.controls.phone.value;
    donator.password = this.profileForm.controls.password.value;
    donator.obs = this.profileForm.controls.obs.value;

    const addressForm = this.profileForm.controls.address as FormGroup;
    address.street = addressForm.controls.street.value;
    address.number = addressForm.controls.number.value;
    address.district = addressForm.controls.district.value;
    address.city = addressForm.controls.city.value;
    address.uf = addressForm.controls.uf.value;
    donator.address = address;
    return donator;
  }

  get estados() {
    return estados;
  }
}
