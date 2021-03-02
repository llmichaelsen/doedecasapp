import { FoodService } from "./../../ui/services/food.service";
import { Institution } from "./../../ui/models/user/institution.model";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { InstitutionService } from "./../../ui/services/institution.service";
import { LoadingService } from "./../../ui/services/loading.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "./../../ui/services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, Inject, OnInit } from "@angular/core";
import { Food } from "app/ui/models/food/food";

@Component({
  selector: "app-edit-institution-modal",
  templateUrl: "./edit-institution-modal.component.html",
  styleUrls: ["./edit-institution-modal.component.css"],
})
export class EditInstitutionModalComponent implements OnInit {
  profileForm: FormGroup;
  institution: Institution;
  foods: Food[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditInstitutionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public authServ: AuthService,
    private service: InstitutionService,
    private loadingServ: LoadingService,
    private fb: FormBuilder,
    private foodService: FoodService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async ngOnInit() {
    try {
      this.createForm();
      this.foods = await this.foodService.list();
    } catch (error) {
      alert(error);
    }
  }

  createForm(): void {
    this.institution = this.authServ.getUserApp() as Institution;
    this.profileForm = this.institution.getFormGroup();
  }

  close(success: boolean): void {
    this.dialogRef.close(success);
  }

  async onSubmit(): Promise<void> {
    if (this.profileForm.invalid) {
      return;
    }

    const load = this.loadingServ.show();
    const user = this.institution.createUser(this.profileForm);
    this.service
      .updateInstitution(user)
      .then((r) => this.close(true))
      .catch((error) => alert(error))
      .finally(() => this.loadingServ.close(load));
  }

  isItemDisabled(food: Food): boolean {
    if (
      this.profileForm.get("foodNeeded").value.length > 4 &&
      !this.profileForm.get("foodNeeded").value.includes(food.id)
    ) {
      return true;
    }
    return false;
  }
}
