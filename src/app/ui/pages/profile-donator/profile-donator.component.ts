import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { DonatorService } from "./../../services/donator.service";
import { Donator } from "../../models/user/donator.model";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/ui/services/auth.service";
import { EditDonatorModalComponent } from "app/components/modals/edit-donator-modal/edit-donator-modal.component";
import { DonationOfferModalComponent } from "app/components/modals/donation-offer-modal/donation-offer-modal.component";
import { MessageModalComponent } from "app/components/modals/message-modal/message-modal.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile-donator.component.html",
  styleUrls: ["./profile-donator.component.scss"],
})
export class ProfileDonatorComponent implements OnInit {
  editModal: MatDialogRef<EditDonatorModalComponent>;
  donationOfferModal: MatDialogRef<DonationOfferModalComponent>;
  messageModal: MatDialogRef<MessageModalComponent>;

  constructor(
    private service: DonatorService,
    public dialog: MatDialog,
    public authServ: AuthService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.actRoute.queryParams.subscribe(params => {
      if(params.openOffer === "true") this.openDonationOffer();
    });
  }

  openEdit(): void {
    this.editModal = this.dialog.open(EditDonatorModalComponent);
  }

  openDonationOffer(): void {
    this.donationOfferModal = this.dialog.open(DonationOfferModalComponent, {
      width: "800px",
    });
    this.donationOfferModal.afterClosed().subscribe((result) => {
      if (result) this.openMessageModal();
    });
  }

  openMessageModal() {
    this.messageModal = this.dialog.open(MessageModalComponent, {
      width: "500px",
      data: {
        type: "success",
        text:
          "Oferta de doação criada com sucesso. Veja suas doações na aba de Minhas Doações.",
      },
    });
  }

  async deleteAccount(): Promise<void> {
    await this.service.deleteUser(this.user, "eetsetes");
    await this.authServ.logout();
  }

  get user(): Donator {
    return this.authServ.getUserApp() as Donator;
  }
}
