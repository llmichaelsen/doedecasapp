import { MyDonationGuard } from './../../guards/my-donation.guard';
import { MyDonationsForInstitutionComponent } from "./my-donations-for-institution/my-donations-for-institution.component";
import { MyDonationsForDonatorComponent } from "./my-donations-for-donator/my-donations-for-donator.component";
import { MyDonationsComponent } from "./my-donations.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: MyDonationsComponent,
    canActivate: [MyDonationGuard],
    children: [
      {
        path: "donator",
        component: MyDonationsForDonatorComponent,
        canDeactivate: [MyDonationGuard]
      },
      {
        path: "institution",
        component: MyDonationsForInstitutionComponent,
        canDeactivate: [MyDonationGuard]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyDonationsRoutingModule {}
