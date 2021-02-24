import { DonateModalComponent } from "./../../../components/donate-modal/donate-modal.component";
import { MatDialogRef } from "@angular/material/dialog";
import { MatDialog } from "@angular/material/dialog";
import { EditInstitutionModalComponent } from "./../../../components/edit-institution-modal/edit-institution-modal.component";
import { InstitutionService } from "../../services/institution.service";
import { Institution } from "../../models/user/institution.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserApp } from "app/ui/models/user/user-app.model";
import { AuthService } from "app/ui/services/auth.service";

@Component({
  selector: "profile-institution",
  templateUrl: "./profile-institution.component.html",
  styleUrls: ["./profile-institution.component.css"],
})
export class ProfileInstitutionComponent implements OnInit {
  userLogado: UserApp;
  instituicao: Institution;
  uid: string;

  editModal: MatDialogRef<EditInstitutionModalComponent>;
  donateModal: MatDialogRef<DonateModalComponent>;

  constructor(
    private institutionServ: InstitutionService,
    public authServ: AuthService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.uid = this.route.snapshot.paramMap.get("id");
  }

  async ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");

    this.instituicao = this.uid
      ? await this.institutionServ.getItem(this.uid)
      : (this.authServ.getUserApp() as Institution);

    this.userLogado = await this.authServ.getUserApp();
  }

  donation(): void {
    if (!this.authServ.isLoggedIn) {
      alert("É preciso estar logado para fazer doações.");
      return;
    }
    this.donateModal = this.dialog.open(DonateModalComponent);
    this.donateModal.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  editProfile(): void {
    this.editModal = this.dialog.open(EditInstitutionModalComponent);
    this.editModal.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

}
