import { DeliveryTime } from "../../../ui/models/donation/delivery-time";
import { DonationStatus } from "../../../ui/models/donation/donation-status.enum";
import { Institution } from "../../../ui/models/user/institution.model";
import { Donator } from "../../../ui/models/user/donator.model";
import { AuthService } from "../../../ui/services/auth.service";
import { DonationRequest } from "../../../ui/models/donation/donation-request";
import { FoodService } from "../../../ui/services/food.service";
import { DonationRequestService } from "../../../ui/services/donation-request.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { LoadingService } from "../../../ui/services/loading.service";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  FormArray,
} from "@angular/forms";
import { Component, Inject, OnInit } from "@angular/core";
import { Food } from "app/ui/models/food/food";
import { NotificationService } from "app/ui/services/notification.service";
import { Notification } from "app/ui/models/notification/notification";

@Component({
  selector: "app-donate-modal",
  templateUrl: "./donation-request-modal.component.html",
  styleUrls: ["./donation-request-modal.component.scss"],
})
export class DonationRequestModal implements OnInit {
  foods: Food[] = [];
  donationForm: FormGroup;
  items: FormArray = new FormArray([]);
  minDate = new Date();

  constructor(
    private fb: FormBuilder,
    private loadingServ: LoadingService,
    private authServ: AuthService,
    private donationServ: DonationRequestService,
    public dialogRef: MatDialogRef<DonationRequestModal>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private foodService: FoodService,
    private notificationServ: NotificationService
  ) {}

  async ngOnInit(): Promise<void> {
    console.log(this.data);
    this.createForm();
    this.foods = await this.foodService.list();
  }

  createForm() {
    this.donationForm = this.fb.group({
      foodAmount: this.fb.array([this.createFoodItem()]),
      deliveryTime: this.fb.group({
        day: [null, Validators.required],
        initTime: [null, Validators.required],
        endTime: [null, Validators.required],
      }),
    });
  }

  createFoodItem(): FormGroup {
    return this.fb.group({
      food: [null, Validators.required],
      amount: [null, Validators.required],
    });
  }

  addItem(): void {
    this.items = this.donationForm.get("foodAmount") as FormArray;
    this.items.push(this.createFoodItem());
  }

  removeItem(i) {
    this.items = this.donationForm.get("foodAmount") as FormArray;
    this.items.removeAt(i);
    console.log(this.items, i);
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (this.donationForm.invalid) {
      return;
    }

    const load = this.loadingServ.show();
    this.donationServ
      .saveDonation(this.createDonation())
      .then(() => {
        this.notificationServ.saveNotification(this.createNotification());
        this.successMessage(formDirective);
      })
      .catch((error) => console.log(error))
      .finally(() => this.loadingServ.close(load));
  }

  createNotification(): Notification {
    const not = new Notification();
    not.message = `O doador ${(this.authServ.getUserApp() as Donator).getFullName()} agendou uma doação para entrega na instituição.`;
    not.userApp = this.data.uid;
    return not;
  }

  createDonation(): DonationRequest {
    const data = this.donationForm.getRawValue();
    const donation = new DonationRequest();
    donation.deliveryTime.day = (data.deliveryTime.day as Date).getTime();
    donation.deliveryTime.initTime = data.deliveryTime.initTime;
    donation.deliveryTime.endTime = data.deliveryTime.endTime;
    donation.donator = this.authServ.getUserApp().uid;
    donation.institution = this.data.uid as Institution;
    donation.foodAmount = data.foodAmount;
    return donation;
  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }

  async successMessage(formDirective: FormGroupDirective): Promise<void> {
    this.createForm();
    formDirective.resetForm();
    this.close(true);
  }

  dateFilter = (date: Date) => {
    return this.data.workingTime.dateFilter(date);
  };
}
