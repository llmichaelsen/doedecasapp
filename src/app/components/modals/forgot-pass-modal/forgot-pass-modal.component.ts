import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { AlertMessages } from "app/ui/models/alert/alert-messages.enum";
import { AlertService } from "app/ui/services/alert.service";
import { AuthService } from "app/ui/services/auth.service";
import { LoadingService } from "app/ui/services/loading.service";

@Component({
  selector: "app-forgot-pass-modal",
  templateUrl: "./forgot-pass-modal.component.html",
  styleUrls: ["./forgot-pass-modal.component.css"],
})
export class ForgotPassModalComponent implements OnInit {
  forgotForm: FormGroup;
  messageModal: MatDialogRef<ForgotPassModalComponent>;

  constructor(
    public dialogRef: MatDialogRef<ForgotPassModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public authServ: AuthService,
    private loadingServ: LoadingService,
    private alertServ: AlertService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    try {
      this.createForm();
    } catch (error) {
      alert(error);
    }
  }

  createForm(): void {
    const fb = new FormBuilder();
    this.forgotForm = fb.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  close(success: boolean): void {
    this.dialogRef.close(success);
  }

  async onSubmit(): Promise<void> {
    if (this.forgotForm.invalid) {
      return;
    }

    const load = this.loadingServ.show();
    this.authServ
      .sendRecoverEmail(this.forgotForm.controls.email.value)
      .then((r) => {
        this.close(true);
        this.alertServ.openSuccess("E-mail de recuperação enviado.");
      })
      .catch((error) => this.alertServ.openError(AlertMessages[error.code]))
      .finally(() => this.loadingServ.close(load));
  }
}
