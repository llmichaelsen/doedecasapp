import { AuthService } from './../../../ui/services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { Food } from 'app/ui/models/food/food';
import { Institution } from 'app/ui/models/user/institution.model';
import { InstitutionService } from 'app/ui/services/institution.service';
import { LoadingService } from 'app/ui/services/loading.service';
import { FoodService } from 'app/ui/services/food.service';

@Component({
  selector: 'app-config-donation-modal',
  templateUrl: './config-donation-modal.component.html',
  styleUrls: ['./config-donation-modal.component.css']
})
export class ConfigDonationModalComponent implements OnInit {

  profileForm: FormGroup;
  institution: Institution;
  foods: Food[] = [];

  constructor(
    public dialogRef: MatDialogRef<ConfigDonationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public authServ: AuthService,
    private service: InstitutionService,
    private loadingServ: LoadingService,
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
    this.profileForm = this.institution.getFormGroupConfig();
  }

  close(success: boolean): void {
    this.dialogRef.close(success);
  }

  async onSubmit(): Promise<void> {
    if (this.profileForm.invalid) {
      return;
    }

    const load = this.loadingServ.show();
    const user = this.institution.createUserConfig(this.profileForm);
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
