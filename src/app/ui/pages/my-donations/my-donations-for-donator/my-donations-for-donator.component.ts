import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { DonationStatusInstitutionColumn } from "./../../../models/donation/donation-status.enum";
import { FoodService } from "./../../../services/food.service";
import { LoadingService } from "./../../../services/loading.service";
import { IDonationService } from "./../../../services/donation-service.interface";
import { AuthService } from "./../../../services/auth.service";
import { DonationRequestService } from "./../../../services/donation-request.service";
import { DonationOfferService } from "./../../../services/donation-offer.service";
import { DonationOffer } from "app/ui/models/donation/donation-offer";
import { Component, OnInit, Type } from "@angular/core";
import { DonationRequest } from "app/ui/models/donation/donation-request";
import { DonationStatus } from "app/ui/models/donation/donation-status.enum";
import { Food } from "app/ui/models/food/food";
import { Donation, DonationType } from "app/ui/models/donation/donation";
import { IDonationStatusStrategy } from "app/ui/models/donation/donation-status-strategy";
import { DonationCompleteModalComponent } from "app/components/modals/donation-complete-modal/donation-complete-modal.component";

@Component({
  selector: "app-my-donations-for-donator",
  templateUrl: "./my-donations-for-donator.component.html",
  styleUrls: ["./my-donations-for-donator.component.css"],
})
export class MyDonationsForDonatorComponent implements OnInit {
  displayedColumns: string[] = [
    "createdAt",
    "institution",
    "food",
    "amount",
    "status",
    "deliveryTime",
    "actions",
  ];

  foods: Food[] = [];
  donationOffer: DonationOffer[] = [];
  donationRequest: DonationRequest[] = [];
  donationStatusStrategy: IDonationStatusStrategy;
  completeModal: MatDialogRef<DonationCompleteModalComponent>;

  constructor(
    private donationOfferServ: DonationOfferService,
    private donationRequestServ: DonationRequestService,
    private authServ: AuthService,
    public dialog: MatDialog,
    private loadingServ: LoadingService,
    public foodServ: FoodService
  ) {}

  ngOnInit(): void {
    this.loadDonations();
  }

  async loadDonations(): Promise<void> {
    this.donationOffer = await this.donationOfferServ.getDonationsByDonator(
      this.authServ.getUserApp().uid
    );
    this.donationRequest = await this.donationRequestServ.getDonationsByDonator(
      this.authServ.getUserApp().uid
    );

    console.log(this.donationRequest)
  }

  cancelDonation(donation: DonationType): void {
    if (confirm("Você tem certeza disso?")) {
      debugger
      donation.status = DonationStatus.Canceled;
      let service: IDonationService;
      if (donation.getType() === DonationOffer)
        service = this.donationOfferServ;
      if (donation.getType() === DonationRequest)
        service = this.donationRequestServ;

      const load = this.loadingServ.show();
      service
        .cancelDonation(donation)
        .then(() => this.loadDonations())
        .catch((error) => alert(error))
        .finally(() => this.loadingServ.close(load));
    }
  }

  completeDonation(donation: DonationType): void {
    this.completeModal = this.dialog.open(DonationCompleteModalComponent, {
      data: donation,
      width: "800px",
    });
    this.completeModal.afterClosed().subscribe((result) => {
      if (result) this.loadDonations();
    });
  }

  get DonationStatus(): any {
    return DonationStatus;
  }

  getDonationStatusInstitutionColumn(DonationStatus): string {
    return DonationStatusInstitutionColumn[DonationStatus];
  }
}
