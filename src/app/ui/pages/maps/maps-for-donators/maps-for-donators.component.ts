import { Institution } from "./../../../models/user/institution.model";
import { FoodService } from "./../../../services/food.service";
import { GeocodeService } from "./../../../services/geocode.service";
import { InstitutionService } from "./../../../services/institution.service";
import { MapsAPILoader } from "@agm/core";
import { Component, NgZone, OnInit } from "@angular/core";
import { InstitutionModalComponent } from "app/components/modals/institution-modal/institution-modal.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-maps-for-donators",
  templateUrl: "./maps-for-donators.component.html",
  styleUrls: ["./maps-for-donators.component.css"],
})
export class MapsForDonatorsComponent implements OnInit {
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private instServ: InstitutionService,
    private geocodeServ: GeocodeService,
    private foodServ: FoodService,
    public dialog: MatDialog,
    private ngZone: NgZone
  ) {}

  map: any;
  markers = [];
  foods = [];
  notification = true;
  infoModal: MatDialogRef<InstitutionModalComponent>;

  async ngOnInit() {
    this.mapsAPILoader.load().then(async (r) => {
      this.initMap();
      this.requestPosition();
      this.loadInstitutionsMarkers();
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

  async loadInstitutionsMarkers(): Promise<void> {
    const insts = await this.instServ.getEnabledInstitutions();
    insts.forEach((item) => {
      this.geocodeServ
        .geocodeAddress(item.address.getFullAddress())
        .subscribe((location: any) => {
          const mrk = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            title: item.name,
            map: this.map,
          });

          mrk.addListener("click", () => {
            this.openInstitutionInfo(item);
          });
          this.markers.push(mrk);
        });
    });
  }

  openInstitutionInfo(inst: Institution): void {
    this.ngZone.run(() => {
      this.infoModal = this.dialog.open(InstitutionModalComponent, {
        data: inst,
        width: "600px",
      });
    });
  }

  closeAlert() {
    this.notification = false;
  }
}
