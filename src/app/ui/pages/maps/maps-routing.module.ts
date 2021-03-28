import { MapsForInstitutionsComponent } from "./maps-for-institutions/maps-for-institutions.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MapsForDonatorsComponent } from "./maps-for-donators/maps-for-donators.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "donator",
  },
  {
    path: "donator",
    component: MapsForDonatorsComponent,
  },
  {
    path: "institution",
    component: MapsForInstitutionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsRoutingModule {}
