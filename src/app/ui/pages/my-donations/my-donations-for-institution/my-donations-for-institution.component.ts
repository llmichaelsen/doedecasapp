import { DonatorInfoModalComponent } from './../../../../components/modals/donator-info-modal/donator-info-modal.component';
import { DonationRequest } from 'app/ui/models/donation/donation-request';
import { DonationOffer } from 'app/ui/models/donation/donation-offer';
import { Component, OnInit } from '@angular/core';
import { DonationCompleteModalComponent } from 'app/components/modals/donation-complete-modal/donation-complete-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DonationOfferService } from 'app/ui/services/donation-offer.service';
import { DonationRequestService } from 'app/ui/services/donation-request.service';
import { AuthService } from 'app/ui/services/auth.service';
import { LoadingService } from 'app/ui/services/loading.service';
import { FoodService } from 'app/ui/services/food.service';
import { DonationType } from 'app/ui/models/donation/donation';
import { DonationStatus, DonationStatusInstitutionColumn } from 'app/ui/models/donation/donation-status.enum';
import { IDonationService } from 'app/ui/services/donation-service.interface';
import { Food } from 'app/ui/models/food/food';
import { IDonationStatusStrategy } from 'app/ui/models/donation/donation-status-strategy';
import { Donator } from 'app/ui/models/user/donator.model';

@Component({
  selector: 'app-my-donations-for-institution',
  templateUrl: './my-donations-for-institution.component.html',
  styleUrls: ['./my-donations-for-institution.component.css']
})
export class MyDonationsForInstitutionComponent implements OnInit {

  displayedColumns: string[] = [
    "createdAt",
    "donator",
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
  donatorInfoModal: MatDialogRef<DonatorInfoModalComponent>;

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
    this.donationOffer = await this.donationOfferServ.getDonationsByInstitution(
      this.authServ.getUserApp().uid
    );
    this.donationRequest = await this.donationRequestServ.getDonationsByInstitution(
      this.authServ.getUserApp().uid
    );

    console.log(this.donationRequest)
  }

  cancelDonation(donation: DonationType): void {
    if (confirm("Você tem certeza disso?")) {
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

  openDonatorInfo(donator: Donator, showAddress: boolean): void {
    this.donatorInfoModal = this.dialog.open(DonatorInfoModalComponent, {
      data: {donator, showAddress: showAddress },
      width: "600px",
    });    
  }

  get DonationStatus(): any {
    return DonationStatus;
  }

  getDonationStatusInstitutionColumn(DonationStatus): string {
    return DonationStatusInstitutionColumn[DonationStatus];
  }

}
