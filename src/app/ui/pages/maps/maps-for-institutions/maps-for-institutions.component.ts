import { DonationCollectModalComponent } from "./../../../../components/modals/donation-collect-modal/donation-collect-modal.component";
import { MatDialogRef } from "@angular/material/dialog";
import { MatDialog } from "@angular/material/dialog";
import { DonationOfferService } from "./../../../services/donation-offer.service";
import { FoodService } from "./../../../services/food.service";
import { GeocodeService } from "./../../../services/geocode.service";
import { MapsAPILoader } from "@agm/core";
import { Component, NgZone, OnInit } from "@angular/core";
import { Donator } from "app/ui/models/user/donator.model";
import { DonationOffer } from "app/ui/models/donation/donation-offer";

@Component({
  selector: "app-maps-for-institutions",
  templateUrl: "./maps-for-institutions.component.html",
  styleUrls: ["./maps-for-institutions.component.css"],
})
export class MapsForInstitutionsComponent implements OnInit {
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private donationServ: DonationOfferService,
    private geocodeServ: GeocodeService,
    private foodServ: FoodService,
    public dialog: MatDialog,
    private ngZone: NgZone
  ) {}

  map: any;
  markers = [];
  foods = [];
  collectModal: MatDialogRef<DonationCollectModalComponent>;

  async ngOnInit() {
    this.mapsAPILoader.load().then(async (r) => {
      this.initMap();
      this.requestPosition();
      this.loadDonatorsMarkers();
      this.foods = await this.foodServ.list();
    });
  }

  initMap(): void {
    var myLatlng = new google.maps.LatLng(-29.363882, -50.809258);
    var mapOptions = {
      zoom: 15,
      center: myLatlng,
      scrollwheel: false,
    };
    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
  }

  requestPosition(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (result) => {
          var latLng = new google.maps.LatLng(
            result.coords.latitude,
            result.coords.longitude
          );
          this.map.setCenter(latLng);
        },
        (error) => {
          if (error.code === 1) {
            alert(
              "Favor permita acesso a sua localização para centralizarmos em sua localidade."
            );
          }
        }
      );
    }
  }

  async loadDonatorsMarkers(): Promise<void> {
    const donations = await this.donationServ.getInitiatedDonations();
    donations.forEach((item) => {
      const donator = item.donator as Donator;
      this.geocodeServ
        .geocodeAddress(donator.address.getFullAddress())
        .subscribe((location: any) => {
          const mrk = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            title: donator.getFullName(),
            map: this.map,
          });

          mrk.addListener("click", () => {
            this.openDonationModal(item);
          });
          this.markers.push(mrk);
        });
    });
  }

  getPriorityFoods(donation: DonationOffer): string[] {
    return this.foods
      .find((f) => donation.food === f.id)
      .map((f) => " " + f.title);
  }

  openDonationModal(donation: DonationOffer): void {
    this.ngZone.run(() => {
      this.collectModal = this.dialog.open(DonationCollectModalComponent, {
        data: donation,
        width: "800px",
      });
      this.collectModal.afterClosed().subscribe((result) => {
        if (result) {
          this.initMap();
          this.loadDonatorsMarkers();
        }
      });
    });
  }
}
