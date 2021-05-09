import { RoutePath } from "./../../ui/models/route-path";
import { Component, OnInit, ElementRef } from "@angular/core";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { AuthService } from "app/ui/services/auth.service";
import { UserApp } from "app/ui/models/user/user-app.model";
import { UserService } from "app/ui/services/user.service";
import { NotificationService } from "app/ui/services/notification.service";
import { Router } from "@angular/router";
import { Notification } from "app/ui/models/notification/notification";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  notifications = [];

  user: UserApp;
  constructor(
    public location: Location,
    private element: ElementRef,
    private router: Router,
    public authServ: AuthService,
    public userServ: UserService,
    private notificationServ: NotificationService
  ) {
    this.sidebarVisible = false;
  }

  async ngOnInit() {
    this.user = this.authServ.getUserApp();
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    this.notificationServ
      .getUnreadNotifications(this.user.uid)
      .subscribe((result) => (this.notifications = result));
  }

  notificationClick(not: Notification) {
    if (this.router.url.includes(RoutePath.MyDonations)) {
      this.notificationServ.readNotification(
        this.authServ.getUserApp().uid,
        not
      );
    }
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName("html")[0];
    setTimeout(function () {
      toggleButton.classList.add("toggled");
    }, 500);
    html.classList.add("nav-open");

    this.sidebarVisible = true;
  }

  sidebarClose() {
    const html = document.getElementsByTagName("html")[0];
    // console.log(html);
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    html.classList.remove("nav-open");
  }

  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  logout(): void {
    this.authServ.logout();
  }

  redirectDonateFromHome() {
    this.router.navigateByUrl(RoutePath.Profile + "?openOffer=true");
  }
}
