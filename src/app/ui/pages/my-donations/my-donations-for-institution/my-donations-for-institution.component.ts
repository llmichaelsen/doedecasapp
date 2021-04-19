import { Institution } from "app/ui/models/user/institution.model";
import { DonatorInfoModalComponent } from "./../../../../components/modals/donator-info-modal/donator-info-modal.component";
import { DonationRequest } from "app/ui/models/donation/donation-request";
import { DonationOffer } from "app/ui/models/donation/donation-offer";
import { Component, OnInit } from "@angular/core";
import { DonationCompleteModalComponent } from "app/components/modals/donation-complete-modal/donation-complete-modal.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DonationOfferService } from "app/ui/services/donation-offer.service";
import { DonationRequestService } from "app/ui/services/donation-request.service";
import { AuthService } from "app/ui/services/auth.service";
import { LoadingService } from "app/ui/services/loading.service";
import { FoodService } from "app/ui/services/food.service";
import { DonationType } from "app/ui/models/donation/donation";
import {
  DonationStatus,
  DonationStatusInstitutionColumn,
} from "app/ui/models/donation/donation-status.enum";
import { IDonationService } from "app/ui/services/donation-service.interface";
import { Food } from "app/ui/models/food/food";
import { IDonationStatusStrategy } from "app/ui/models/donation/donation-status-strategy";
import { Donator } from "app/ui/models/user/donator.model";
import { NotificationService } from "app/ui/services/notification.service";
import { Notification } from "app/ui/models/notification/notification";
import { MessageModalComponent } from "app/components/modals/message-modal/message-modal.component";

@Component({
  selector: "app-my-donations-for-institution",
  templateUrl: "./my-donations-for-institution.component.html",
  styleUrls: ["./my-donations-for-institution.component.css"],
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
  messageModal: MatDialogRef<MessageModalComponent>;

  constructor(
    private donationOfferServ: DonationOfferService,
    private donationRequestServ: DonationRequestService,
    private authServ: AuthService,
    public dialog: MatDialog,
    private loadingServ: LoadingService,
    public foodServ: FoodService,
    private notificationServ: NotificationService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.notificationServ.readAllNotifications(
      this.authServ.getUserApp().uid
    );
    this.loadDonations();
  }

  async loadDonations(): Promise<void> {
    this.donationOffer = await this.donationOfferServ.getDonationsByInstitution(
      this.authServ.getUserApp().uid
    );
    this.donationRequest = await this.donationRequestServ.getDonationsByInstitution(
      this.authServ.getUserApp().uid
    );
  }

  cancelDonation(donation: DonationOffer): void {
    if (confirm("Você tem certeza disso?")) {
      donation.status = DonationStatus.Canceled;
      let service = this.donationOfferServ;

      const load = this.loadingServ.show();
      service
        .cancelDonation(donation)
        .then(() => {
          this.notificationServ.saveNotification(
            this.createNotification(donation)
          );
          this.loadDonations();
          this.openMessageModalCancel()
        })
        .catch((error) => alert(error))
        .finally(() => this.loadingServ.close(load));
    }
  }

  createNotification(donation: DonationOffer): Notification {
    const not = new Notification();
    not.message = `A instituição ${
      (this.authServ.getUserApp() as Institution).name
    } cancelou uma coleta para retirada em seu endereço.`;
    not.userApp = (donation.donator as Donator).uid;
    return not;
  }

  completeDonation(donation: DonationType): void {
    this.completeModal = this.dialog.open(DonationCompleteModalComponent, {
      data: donation,
      width: "800px",
    });
    this.completeModal.afterClosed().subscribe((result) => {
      if (result) {
        this.loadDonations();
        this.openMessageModalComplete();
      }
    });
  }

  openMessageModalComplete() {
    this.messageModal = this.dialog.open(MessageModalComponent, {
      width: "500px",
      data: {
        type: "success",
        text: "Doação concluída com sucesso.",
      },
    });
  }

  openMessageModalCancel() {
    this.messageModal = this.dialog.open(MessageModalComponent, {
      width: "500px",
      data: {
        type: "success",
        text: "Doação cancelada com sucesso.",
      },
    });
  }

  openDonatorInfo(donator: Donator, showAddress: boolean): void {
    this.donatorInfoModal = this.dialog.open(DonatorInfoModalComponent, {
      data: { donator, showAddress: showAddress },
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
