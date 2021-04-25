import { DonationOfferService } from "./../../../ui/services/donation-offer.service";
import { FormGroup } from "@angular/forms";
import { LoadingService } from "./../../../ui/services/loading.service";
import { AuthService } from "./../../../ui/services/auth.service";
import { DonationRequestService } from "./../../../ui/services/donation-request.service";
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FoodService } from "./../../../ui/services/food.service";
import { DonationRequest } from "./../../../ui/models/donation/donation-request";
import { Institution } from "./../../../ui/models/user/institution.model";
import { FormGroupDirective, Validators, FormBuilder } from "@angular/forms";
import { Component, Inject, OnInit } from "@angular/core";
import { Food } from "app/ui/models/food/food";
import { DonationOffer } from "app/ui/models/donation/donation-offer";
import { DonationStatus } from "app/ui/models/donation/donation-status.enum";
import { NotificationService } from "app/ui/services/notification.service";
import { Notification } from "app/ui/models/notification/notification";

@Component({
  selector: "app-donation-collect-modal",
  templateUrl: "./donation-collect-modal.component.html",
  styleUrls: ["./donation-collect-modal.component.css"],
})
export class DonationCollectModalComponent implements OnInit {
  foods: Food[] = [];
  donationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingServ: LoadingService,
    private authServ: AuthService,
    private donationServ: DonationOfferService,
    public dialogRef: MatDialogRef<DonationCollectModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public foodService: FoodService,
    private notificationServ: NotificationService
  ) {}

  async ngOnInit(): Promise<void> {
    console.log(this.data)
    this.createForm();
    this.foods = await this.foodService.list();
  }

  createForm() {
    this.donationForm = this.fb.group({
      deliveryTime: this.fb.group({
        day: [null, Validators.required],
        initTime: [null, Validators.required],
        endTime: [null, Validators.required],
      }),
    });
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (this.donationForm.invalid) {
      return;
    }

    const load = this.loadingServ.show();
    this.donationServ
      .updateDonation(this.createDonation())
      .then(() => {
        this.notificationServ.saveNotification(this.createNotification());
        this.successMessage(formDirective);
      })
      .catch((error) => console.log(error))
      .finally(() => this.loadingServ.close(load));
  }

  createDonation(): DonationOffer {
    const data = this.donationForm.getRawValue();
    const donation = new DonationOffer();
    donation.deliveryTime.day = (data.deliveryTime.day as Date).getTime();
    donation.deliveryTime.initTime = data.deliveryTime.initTime;
    donation.deliveryTime.endTime = data.deliveryTime.endTime;
    donation.donator = this.data.donator.uid;
    donation.institution = this.authServ.getUserApp().uid;
    donation.foodAmount = this.data.foodAmount;
    donation.key = this.data.key;
    donation.workingTime = this.data.workingTime;
    donation.status = DonationStatus.Scheduled;
    return donation;
  }

  createNotification(): Notification {
    const not = new Notification();
    not.message = `A instituição ${
      (this.authServ.getUserApp() as Institution).name
    } agendou uma coleta para retirada em seu endereço.`;
    not.userApp = this.data.donator.uid;
    return not;
  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }

  async successMessage(formDirective: FormGroupDirective): Promise<void> {
    this.createForm();
    formDirective.resetForm();
    this.close(true);
  }

  getFoodName(number): string {
    if (this.foods.length) return this.foods.find((f) => f.id === number).title;
  }
}
