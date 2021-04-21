import { Institution } from "../../../ui/models/user/institution.model";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { InstitutionService } from "../../../ui/services/institution.service";
import { LoadingService } from "../../../ui/services/loading.service";
import { AuthService } from "../../../ui/services/auth.service";
import { FormGroup } from "@angular/forms";
import { Component, Inject, OnInit } from "@angular/core";
import { estados } from "app/utils/estados.array";
import { MessageModalComponent } from "../message-modal/message-modal.component";

@Component({
  selector: "app-edit-institution-modal",
  templateUrl: "./edit-institution-modal.component.html",
  styleUrls: ["./edit-institution-modal.component.css"],
})
export class EditInstitutionModalComponent implements OnInit {
  profileForm: FormGroup;
  institution: Institution;
  messageModal: MatDialogRef<MessageModalComponent>;

  constructor(
    public dialogRef: MatDialogRef<EditInstitutionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public authServ: AuthService,
    private service: InstitutionService,
    private loadingServ: LoadingService,
    public dialog: MatDialog
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async ngOnInit() {
    try {
      this.createForm();
    } catch (error) {
      alert(error);
    }
  }

  createForm(): void {
    this.institution = this.authServ.getUserApp() as Institution;
    this.profileForm = this.institution.getFormGroupEdit();
  }

  close(success: boolean): void {
    this.dialogRef.close(success);
  }

  async onSubmit(): Promise<void> {
    if (this.profileForm.invalid) {
      return;
    }

    const load = this.loadingServ.show();
    const user = this.institution.createUserEdit(this.profileForm);
    this.service
      .updateInstitution(user)
      .then((r) => {
        this.close(true);
        this.openMessageModal();
      })
      .catch((error) => alert(error))
      .finally(() => this.loadingServ.close(load));
  }

  openMessageModal() {
    this.messageModal = this.dialog.open(MessageModalComponent, {
      width: "500px",
      data: {
        type: "success",
        text: "Informações de perfil alteradas com sucesso.",
      },
    });
  }

  get estados() {
    return estados;
  }
}
