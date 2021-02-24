import { AuthService } from "app/ui/services/auth.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
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
export class ProfileGuard implements CanActivate {
  constructor(private authServ: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      if(this.authServ.getUserApp().type === UserType.Instituiçao) {
        this.router.navigate(['/instituicao']);
        return false;
      }
    return true;
  }
}
