import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ForgotPassModalComponent } from "app/components/modals/forgot-pass-modal/forgot-pass-modal.component";
import { AuthService } from "app/ui/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  data: Date = new Date();
  focus;
  focus1;
  errors = false;

  loginForm: FormGroup;
  recoveryModal: MatDialogRef<ForgotPassModalComponent>;

  constructor(
    private authServ: AuthService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });

    var body = document.getElementsByTagName("body")[0];
    body.classList.add("login-page");
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("login-page");
  }

  onSubmit() {
    this.authServ
      .authenticate(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value
      )
      .then((r) => {
        this.router.navigate(["/"]);
      })
      .catch((error) => {
        this.errors = true;
        setTimeout(()=> this.errors = false, 3000)
      });
  }

  openRecoveryModal(): void {
    this.recoveryModal = this.dialog.open(ForgotPassModalComponent, {
      width: "600px",
    });
  }

}
