import { Institution } from "./../models/user/institution.model";
import { RoutePath } from "./../models/route-path";
import { AuthService } from "./../services/auth.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { UserType } from "../models/user/user-type.enum";

@Injectable({
  providedIn: "root",
})
export class MyDonationGuard implements CanActivate, CanDeactivate<unknown> {
  constructor(private authServ: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authServ.isLoggedIn) this.router.navigate([RoutePath.Home]);

    if (state.url === RoutePath.MyDonations) {
      if (this.authServ.getUserApp().type === UserType.Doador)
        this.router.navigate([RoutePath.MyDonationsForDonator]);
      if (this.authServ.getUserApp().type === UserType.Instituiçao)
        this.router.navigate([RoutePath.MyDonationsForInstitution]);
      return false;
    } else {
      return true;
    }
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      [
        RoutePath.MyDonationsForDonator,
        RoutePath.MyDonationsForInstitution,
      ].includes(currentState.url as RoutePath) &&
      nextState.url === RoutePath.MyDonations
    ) {
      return false;
    } else {
      return true;
    }
  }
}
