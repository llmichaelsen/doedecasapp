import { ConfigDonationModalComponent } from "./../../../components/modals/config-donation-modal/config-donation-modal.component";
import { RoutePath } from "./../../models/route-path";
import { FoodService } from "./../../services/food.service";
import { DonationRequestModal } from "../../../components/modals/donation-request-modal/donation-request-modal.component";
import { MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { MatDialog } from "@angular/material/dialog";
import { EditInstitutionModalComponent } from "../../../components/modals/edit-institution-modal/edit-institution-modal.component";
import { InstitutionService } from "../../services/institution.service";
import { Institution } from "../../models/user/institution.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserApp } from "app/ui/models/user/user-app.model";
import { AuthService } from "app/ui/services/auth.service";
import { Food } from "app/ui/models/food/food";
import { UserType } from "app/ui/models/user/user-type.enum";
import { MessageModalComponent } from "app/components/modals/message-modal/message-modal.component";

@Component({
  selector: "profile-institution",
  templateUrl: "./profile-institution.component.html",
  styleUrls: ["./profile-institution.component.scss"],
})
export class ProfileInstitutionComponent implements OnInit {
  userLogado: UserApp;
  instituicao: Institution;
  uid: string;
  foods: Food[] = [];

  editModal: MatDialogRef<EditInstitutionModalComponent>;
  configModal: MatDialogRef<ConfigDonationModalComponent>;
  donateModal: MatDialogRef<DonationRequestModal>;
  messageModal: MatDialogRef<MessageModalComponent>;

  constructor(
    private institutionServ: InstitutionService,
    public authServ: AuthService,
    private route: ActivatedRoute,
    private router: Router,
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

  editConfig(): void {
    this.configModal = this.dialog.open(ConfigDonationModalComponent, {
      width: "800px",
    });
    this.configModal.afterClosed().subscribe((result) => {
      if (result) this.reloadInfo();
    });
  }

  openMessageModal() {
    this.messageModal = this.dialog.open(MessageModalComponent, {
      width: "500px",
      data: {
        type: "warning",
        text: "É preciso acessar como Doador para fazer doações.",
      },
    });
  }

  donation(): void {
    if (!(this.authServ.getUserApp().type === UserType.Doador)) {
      this.openMessageModal();
      return;
    }
    this.donateModal = this.dialog.open(DonationRequestModal, {
      data: this.instituicao,
      width: "800px",
    });
    this.donateModal.afterClosed().subscribe((result) => {
      if (result) this.openMessageModalDonator();
    });
  }

  openMessageModalDonator() {
    this.messageModal = this.dialog.open(MessageModalComponent, {
      width: "500px",
      data: {
        type: "success",
        text: "Doação agendada com sucesso. Veja suas doações na aba de Minhas Doações",
      },
    });
  }

  get priorityFoods(): string[] {
    return this.foods
      .filter((f) => this.instituicao.foodNeeded.includes(f.id))
      .map((f) => " " + f.title);
  }

  redirectToInstitutionMap(): void {
    this.router.navigate([RoutePath.MapForInstitutions]);
  }
}
