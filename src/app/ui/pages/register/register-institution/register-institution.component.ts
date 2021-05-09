import { InstitutionService } from "./../../../services/institution.service";
import { Institution } from "./../../../models/user/institution.model";
import { FormBuilder } from "@angular/forms";
import { LoadingService } from "./../../../services/loading.service";
import { Validators, FormGroupDirective } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Address } from "./../../../models/user/address.model";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserType } from "app/ui/models/user/user-type.enum";
import { MessageModalComponent } from "app/components/modals/message-modal/message-modal.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { estados } from "app/utils/estados.array";
import { AlertService } from "app/ui/services/alert.service";
import { AlertMessages } from "app/ui/models/alert/alert-messages.enum";

@Component({
  selector: "app-register-institution",
  templateUrl: "./register-institution.component.html",
  styleUrls: ["./register-institution.component.scss"],
})
export class RegisterInstitutionComponent implements OnInit {
  profileForm: FormGroup;
  messageModal: MatDialogRef<MessageModalComponent>;

  constructor(
    private service: InstitutionService,
    private loadingServ: LoadingService,
    private fb: FormBuilder,
    private router: Router,
    private alertServ: AlertService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.profileForm = this.fb.group({
      name: ["", Validators.required],
      cpnj: ["", [Validators.required, Validators.minLength(18)]],
      phone: ["", [Validators.required, Validators.minLength(15)]],
      description: [""],
      homepage: [""],
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
      responsibleFirstName: ["", Validators.required],
      responsibleLastName: ["", Validators.required],
      responsiblePhone: ["", [Validators.required, Validators.minLength(15)]],
      responsibleRole: [""],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.profileForm.invalid) {
      return;
    }

    const load = this.loadingServ.show();
    const user = this.createUser();
    this.service
      .saveInstitution(user)
      .then(() => this.successMessage())
      .catch((error) => this.alertServ.openError(AlertMessages[error.code]))
      .finally(() => this.loadingServ.close(load));
  }

  successMessage(): void {
    this.openMessageModal();
    this.router.navigate(["/"]);
  }

  openMessageModal() {
    this.messageModal = this.dialog.open(MessageModalComponent, {
      width: "500px",
      data: {
        type: "success",
        text:
          "Agora que sua Instituição está cadastrada, acesse o perfil e cofigure as informações para começar a receber doações.",
      },
    });
  }

  private createUser(): Institution {
    const user = new Institution();
    const address = new Address();
    user.type = UserType.Instituiçao;
    user.name = this.profileForm.controls.name.value;
    user.cpnj = this.profileForm.controls.cpnj.value;
    user.description = this.profileForm.controls.description.value;
    user.homepage = this.profileForm.controls.homepage.value;
    user.phone = this.profileForm.controls.phone.value;

    const addressForm = this.profileForm.controls.address as FormGroup;
    address.street = addressForm.controls.street.value;
    address.number = addressForm.controls.number.value;
    address.district = addressForm.controls.district.value;
    address.city = addressForm.controls.city.value;
    address.uf = addressForm.controls.uf.value;
    user.address = address;

    user.email = this.profileForm.controls.email.value;
    user.password = this.profileForm.controls.password.value;

    user.responsibleFirstName = this.profileForm.controls.responsibleFirstName.value;
    user.responsibleLastName = this.profileForm.controls.responsibleLastName.value;
    user.responsiblePhone = this.profileForm.controls.responsiblePhone.value;
    user.responsibleRole = this.profileForm.controls.responsibleRole.value;

    return user;
  }

  get estados() {
    return estados;
  }
}
