import { RoutePath } from "./../ui/models/route-path";
import { AuthService } from "./../ui/services/auth.service";
import { Component, OnInit, Renderer2, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { NgbAccordionConfig } from "@ng-bootstrap/ng-bootstrap";
import { UserType } from "app/ui/models/user/user-type.enum";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MessageModalComponent } from "./modals/message-modal/message-modal.component";

@Component({
  selector: "app-components",
  templateUrl: "./components.component.html",
  styleUrls: ["./components.component.scss"],
})
export class ComponentsComponent implements OnInit {
  data: Date = new Date();
  messageModal: MatDialogRef<MessageModalComponent>;

  page = 4;
  page1 = 5;
  page2 = 3;
  focus;
  focus1;
  focus2;

  date: { year: number; month: number };
  model: NgbDateStruct;

  public isCollapsed = true;
  public isCollapsed1 = true;
  public isCollapsed2 = true;

  state_icon_primary = true;

  constructor(
    private renderer: Renderer2,
    config: NgbAccordionConfig,
    private router: Router,
    private authServ: AuthService,
    public dialog: MatDialog
  ) {
    config.closeOthers = true;
    config.type = "info";
  }
  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: { month: number }) {
    return date.month !== current.month;
  }

  async ngOnInit() {}

  redirectProfileForDonator() {
    if (this.authServ.getUserApp().type === UserType.Doador) {
      this.router.navigateByUrl(RoutePath.Profile + "?openOffer=true");
    } else {
      this.messageModal = this.dialog.open(MessageModalComponent, {
        width: "500px",
        data: {
          type: "success",
          text:
            "Para acessar essa funcionalidade você precisa acessar como doador.",
          buttons: [
            {
              text: "Cadastre-se",
              callback: () => this.router.navigate([RoutePath.RegisterDonator]),
            },
            {
              text: "Já tenha cadastro",
              callback: () => this.router.navigate([RoutePath.Login]),
            },
          ],
        },
      });
    }
  }
}
