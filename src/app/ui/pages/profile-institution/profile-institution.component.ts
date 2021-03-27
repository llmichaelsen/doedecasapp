import { FoodService } from "./../../services/food.service";
import { DonationRequestModal } from "../../../components/donation-request-modal/donation-request-modal.component";
import { MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { MatDialog } from "@angular/material/dialog";
import { EditInstitutionModalComponent } from "./../../../components/edit-institution-modal/edit-institution-modal.component";
import { InstitutionService } from "../../services/institution.service";
import { Institution } from "../../models/user/institution.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserApp } from "app/ui/models/user/user-app.model";
import { AuthService } from "app/ui/services/auth.service";
import { Food } from "app/ui/models/food/food";
import { UserType } from "app/ui/models/user/user-type.enum";

@Component({
  selector: "profile-institution",
  templateUrl: "./profile-institution.component.html",
  styleUrls: ["./profile-institution.component.css"],
})
export class ProfileInstitutionComponent implements OnInit {
  userLogado: UserApp;
  instituicao: Institution;
  uid: string;
  foods: Food[] = [];

  editModal: MatDialogRef<EditInstitutionModalComponent>;
  donateModal: MatDialogRef<DonationRequestModal>;

  constructor(
    private institutionServ: InstitutionService,
    public authServ: AuthService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private foodserv: FoodService
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
    this.foods = await this.foodserv.list();
  }

  donation(): void {
    if (!(this.authServ.getUserApp().type === UserType.Doador)) {
      alert("É preciso acessar como Doador para fazer doações.");
      return;
    }
    this.donateModal = this.dialog.open(DonationRequestModal, { data: this.instituicao, width: '800px' });
    this.donateModal.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  async reloadInfo(): Promise<void> {
    await this.authServ.setUserApp(this.uid);
    this.instituicao = this.uid
      ? await this.institutionServ.getItem(this.uid)
      : (this.authServ.getUserApp() as Institution);
  }

  editProfile(): void {
    this.editModal = this.dialog.open(EditInstitutionModalComponent);
    this.editModal.afterClosed().subscribe((result) => {
      if (result) this.reloadInfo();
    });
  }

  get priorityFoods(): string[] {
    return this.foods.filter((f) => this.instituicao.foodNeeded.includes(f.id))
      .map(f=> " " + f.title);
  }
}
