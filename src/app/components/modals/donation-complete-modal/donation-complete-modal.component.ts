import { AuthService } from './../../../ui/services/auth.service';
import { DonationStatus } from "app/ui/models/donation/donation-status.enum";
import { donationCompletionMotiveSelect } from "app/ui/models/donation/donation-status-motive.enum";
import { DonationCompletionMotive } from "./../../../ui/models/donation/donation-status-motive.enum";
import { IDonationService } from "./../../../ui/services/donation-service.interface";
import { DonationRequestService } from "./../../../ui/services/donation-request.service";
import { FormGroup } from "@angular/forms";
import { DonationOfferService } from "./../../../ui/services/donation-offer.service";
import { LoadingService } from "./../../../ui/services/loading.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { DonationOffer } from "app/ui/models/donation/donation-offer";
import { FormGroupDirective, Validators, FormBuilder } from "@angular/forms";
import { Component, Inject, OnInit } from "@angular/core";
import { DonationRequest } from "app/ui/models/donation/donation-request";
import { NotificationService } from "app/ui/services/notification.service";
import { Notification } from "app/ui/models/notification/notification";

@Component({
  selector: "app-donation-complete-modal",
  templateUrl: "./donation-complete-modal.component.html",
  styleUrls: ["./donation-complete-modal.component.css"],
})
export class DonationCompleteModalComponent implements OnInit {
  donationForm: FormGroup;
  list = [];

  constructor(
    private fb: FormBuilder,
    private loadingServ: LoadingService,
    private donationOffServ: DonationOfferService,
    private donationReqServ: DonationRequestService,
    public dialogRef: MatDialogRef<DonationCompleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationServ: NotificationService,
    private authServ: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.createForm();
    this.list = donationCompletionMotiveSelect();
  }

  createForm() {
    this.donationForm = this.fb.group({
      motive: [null, Validators.required],
    });
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (this.donationForm.invalid) {
      return;
    }

    let serv: IDonationService;
    if (this.data.getType() === DonationOffer) serv = this.donationOffServ;
    if (this.data.getType() === DonationRequest) serv = this.donationReqServ;

    this.data.completionMotive =
      DonationCompletionMotive[this.donationForm.get("motive").value];
    this.data.status = DonationStatus.Completed;

    const load = this.loadingServ.show();
    serv
      .updateDonation(this.data)
      .then(() => {
        this.notificationServ.saveNotification(Notification.createFromDonation(this.data, this.authServ.getUserApp()))
        this.successMessage(formDirective)
      })
      .catch((error) => console.log(error))
      .finally(() => this.loadingServ.close(load));
  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }

  async successMessage(formDirective: FormGroupDirective): Promise<void> {
    this.createForm();
    formDirective.resetForm();
    this.close(true);
  }
}
