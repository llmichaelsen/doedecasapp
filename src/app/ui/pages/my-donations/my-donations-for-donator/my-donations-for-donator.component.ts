import { InstitutionInfoModalComponent } from "./../../../../components/modals/institution-info-modal/institution-info-modal.component";
import { Institution } from "app/ui/models/user/institution.model";
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
import { Component, OnInit, Type, ViewChild } from "@angular/core";
import { DonationRequest } from "app/ui/models/donation/donation-request";
import { DonationStatus } from "app/ui/models/donation/donation-status.enum";
import { Food } from "app/ui/models/food/food";
import { Donation, DonationType } from "app/ui/models/donation/donation";
import { IDonationStatusStrategy } from "app/ui/models/donation/donation-status-strategy";
import { DonationCompleteModalComponent } from "app/components/modals/donation-complete-modal/donation-complete-modal.component";
import { NotificationService } from "app/ui/services/notification.service";
import { Notification } from "app/ui/models/notification/notification";
import { Donator } from "app/ui/models/user/donator.model";
import { MessageModalComponent } from "app/components/modals/message-modal/message-modal.component";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-my-donations-for-donator",
  templateUrl: "./my-donations-for-donator.component.html",
  styleUrls: ["./my-donations-for-donator.component.css"],
})
export class MyDonationsForDonatorComponent implements OnInit {
  displayedColumns: string[] = [
    "createdAt",
    "institution",
    "foodAmount",
    "status",
    "deliveryTime",
    "actions",
  ];

  @ViewChild('paginatorOffer', {static: true}) paginatorOffer: MatPaginator;
  @ViewChild('paginatorRequest', {static: true}) paginatorRequest: MatPaginator;

  dataSourceOffer = new MatTableDataSource<DonationOffer>();
  dataSourceRequest = new MatTableDataSource<DonationRequest>();

  foods: Food[] = [];
  donationStatusStrategy: IDonationStatusStrategy;
  completeModal: MatDialogRef<DonationCompleteModalComponent>;
  infoModal: MatDialogRef<InstitutionInfoModalComponent>;
  messageModal: MatDialogRef<MessageModalComponent>;

  constructor(
    private donationOfferServ: DonationOfferService,
    private donationRequestServ: DonationRequestService,
    private authServ: AuthService,
    public dialog: MatDialog,
    private loadingServ: LoadingService,
    public foodService: FoodService,
    private notificationServ: NotificationService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.notificationServ.readAllNotifications(
      this.authServ.getUserApp().uid
    );
    this.loadDonations();
    this.dataSourceOffer.paginator = this.paginatorOffer;
    this.dataSourceRequest.paginator = this.paginatorRequest;
  }

  async loadDonations(): Promise<void> {
    this.donationOfferServ.getDonationsByDonator(
      this.authServ.getUserApp().uid
    ).then(
      obs => obs.subscribe(result => this.dataSourceOffer.data = result)
    )

    this.donationRequestServ.getDonationsByDonator(
      this.authServ.getUserApp().uid
    ).then(
      obs => obs.subscribe(result => this.dataSourceRequest.data = result)
    )
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
        .then(() => {
          if (donation.getType() === DonationRequest) this.notificationServ.saveNotification(this.createNotification(donation))
          this.loadDonations();
          this.openMessageModalCancel();
        })
        .catch((error) => alert(error))
        .finally(() => this.loadingServ.close(load));
    }
  }

  createNotification(donation: DonationRequest): Notification {
    const not = new Notification();
    not.message = `O doador ${
      (this.authServ.getUserApp() as Donator).getFullName()
    } cancelou uma doação para entrega na instituição.`;
    not.userApp = (donation.institution as Institution).uid;
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

  openInstitutionInfo(donator: Institution): void {
    this.infoModal = this.dialog.open(InstitutionInfoModalComponent, {
      data: donator,
      width: "600px",
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

  get DonationStatus(): any {
    return DonationStatus;
  }

  getDonationStatusInstitutionColumn(DonationStatus): string {
    return DonationStatusInstitutionColumn[DonationStatus];
  }
}
