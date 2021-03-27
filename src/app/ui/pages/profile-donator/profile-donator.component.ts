import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { DonatorService } from "./../../services/donator.service";
import { Donator } from "../../models/user/donator.model";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/ui/services/auth.service";
import { EditDonatorModalComponent } from "app/components/edit-donator-modal/edit-donator-modal.component";
import { DonationOfferModalComponent } from "app/components/donation-offer-modal/donation-offer-modal.component";

@Component({
  selector: "app-profile",
  templateUrl: "./profile-donator.component.html",
  styleUrls: ["./profile-donator.component.scss"],
})
export class ProfileDonatorComponent implements OnInit {
  editModal: MatDialogRef<EditDonatorModalComponent>;
  donationOfferModal: MatDialogRef<DonationOfferModalComponent>;

  constructor(
    private service: DonatorService,
    public dialog: MatDialog,
    public authServ: AuthService
  ) {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }

  openEdit(): void {
    this.editModal = this.dialog.open(EditDonatorModalComponent);
    this.editModal.afterClosed().subscribe(() => {});
  }

  openDonationOffer(): void {
    this.donationOfferModal = this.dialog.open(DonationOfferModalComponent, {
      width: "800px",
    });
    this.donationOfferModal.afterClosed().subscribe(() => {});
  }

  async deleteAccount(): Promise<void> {
    await this.service.deleteUser(this.user, "eetsetes");
    await this.authServ.logout();
  }

  get user(): Donator {
    return this.authServ.getUserApp() as Donator;
  }
}
