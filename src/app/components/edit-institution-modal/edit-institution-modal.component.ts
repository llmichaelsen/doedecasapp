import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InstitutionService } from './../../ui/services/institution.service';
import { LoadingService } from './../../ui/services/loading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './../../ui/services/auth.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, Inject, OnInit } from "@angular/core";

@Component({
  selector: "app-edit-institution-modal",
  templateUrl: "./edit-institution-modal.component.html",
  styleUrls: ["./edit-institution-modal.component.css"],
})
export class EditInstitutionModalComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditInstitutionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public authServ: AuthService,
    private service: InstitutionService,
    private loadingServ: LoadingService,
    private fb: FormBuilder) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.profileForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      obs: [""],
      address: this.fb.group({
        street: [""],
        number: [""],
        district: [""],
        city: [""]
      })
    });
  }
  
  close(): void {
    this.dialogRef.close(false);
  }

  async onSubmit(): Promise<void> {
    if (this.profileForm.invalid) {
      return;
    }

    // const load = this.loadingServ.show();
    // const user = this.createUser();
    // this.service
    //   .updateDonator(user)
    //   .then(() => this.successMessage(formDirective))
    //   .catch((error) => console.log(error))
    //   .finally(() => this.loadingServ.close(load));
  }
}
