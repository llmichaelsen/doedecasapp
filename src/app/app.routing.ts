import { ProfileGuard } from "./ui/guards/profile.guard";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { ComponentsComponent } from "./components/components.component";
import { ProfileDonatorComponent } from "./ui/pages/profile-donator/profile-donator.component";
import { InstitutionsComponent } from "./ui/pages/institutions/institutions.component";
import { ProfileInstitutionComponent } from "./ui/pages/profile-institution/profile-institution.component";
import { CreditsComponent } from "./ui/pages/credits/credits.component";
import { AuthGuard } from "./ui/services/guards/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "index", pathMatch: "full" },
  { path: "index", component: ComponentsComponent },
  { path: "instituicoes", component: InstitutionsComponent },
  {
    path: "login",
    loadChildren: () =>
      import("./ui/pages/login/login.module").then(
        (module) => module.LoginModule
      ),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./ui/pages/register/register.module").then(
        (module) => module.RegisterModule
      ),
  },
  {
    path: "maps",
    loadChildren: () =>
      import("./ui/pages/maps/maps.module").then((module) => module.MapsModule),
  },
  {
    path: "my-donations",
    loadChildren: () =>
      import("./ui/pages/my-donations/my-donations.module").then(
        (module) => module.MyDonationsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "perfil",
    component: ProfileDonatorComponent,
    canActivate: [AuthGuard, ProfileGuard],
  },
  { path: "instituicao", component: ProfileInstitutionComponent },
  { path: "instituicao/:id", component: ProfileInstitutionComponent },
  { path: "credits", component: CreditsComponent },
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [],
})
export class AppRoutingModule {}
