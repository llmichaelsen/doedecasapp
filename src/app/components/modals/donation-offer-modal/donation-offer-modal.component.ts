import { WorkingTime } from '../../../ui/models/user/working-time.model';
import { DonationStatus } from '../../../ui/models/donation/donation-status.enum';
import { DonationOfferService } from '../../../ui/services/donation-offer.service';
import { DonationOffer } from '../../../ui/models/donation/donation-offer';
import { FoodService } from '../../../ui/services/food.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../../../ui/services/loading.service';
import { AuthService } from '../../../ui/services/auth.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Food } from 'app/ui/models/food/food';

@Component({
  selector: 'app-offer-donation-modal',
  templateUrl: './donation-offer-modal.component.html',
  styleUrls: ['./donation-offer-modal.component.scss']
})
export class DonationOfferModalComponent implements OnInit {

  donationForm: FormGroup;
  foods: Food[] = [];
  items: FormArray = new FormArray([]);


  constructor(
    public dialogRef: MatDialogRef<DonationOfferModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public authServ: AuthService,
    private loadingServ: LoadingService,
    private service: DonationOfferService,
    private foodService: FoodService,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    try {
      this.foods = await this.foodService.list();
      this.createForm();
    } catch (error) {
      alert(error);
    }
  }

  createForm() {
    this.donationForm = this.fb.group({
      foodAmount: this.fb.array([ this.createFoodItem() ]),
      workingTime: new WorkingTime().getFormGroup()
    });
  }

  createFoodItem(): FormGroup {
    return this.fb.group({
      food: [null, Validators.required],
      amount: [null, Validators.required],
    });
  }

  addItem(): void {
    this.items = this.donationForm.get('foodAmount') as FormArray;
    this.items.push(this.createFoodItem());
  }

  removeItem(i) {
    this.items = this.donationForm.get('foodAmount') as FormArray;
    this.items.removeAt(i);
    console.log(this.items, i)
  }

  async onSubmit(): Promise<void> {
    if (this.donationForm.invalid) {
      return;
    }

    const load = this.loadingServ.show();
    const donation = this.createDonation();
    this.service
      .saveDonation(donation)
      .then((r) => this.close(true))
      .catch((error) => alert(error))
      .finally(() => this.loadingServ.close(load));
  }

  createDonation(): DonationOffer {
    const data = this.donationForm.getRawValue();
    const donation = new DonationOffer();

    donation.donator = this.authServ.getUserApp().uid;
    donation.foodAmount = data.foodAmount;
    donation.workingTime = data.workingTime;
    return donation;
  }

  close(success: boolean): void {
    this.dialogRef.close(success);
  }

}
