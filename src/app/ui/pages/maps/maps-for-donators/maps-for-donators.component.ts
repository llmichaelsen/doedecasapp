import { Institution } from './../../../models/user/institution.model';
import { FoodService } from './../../../services/food.service';
import { GeocodeService } from './../../../services/geocode.service';
import { InstitutionService } from './../../../services/institution.service';
import { MapsAPILoader } from '@agm/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps-for-donators',
  templateUrl: './maps-for-donators.component.html',
  styleUrls: ['./maps-for-donators.component.css']
})
export class MapsForDonatorsComponent implements OnInit {

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private instServ: InstitutionService,
    private geocodeServ: GeocodeService,
    private foodServ: FoodService
  ) {}

  map: any;
  markers = [];
  foods = [];
  currentWindom;

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

          const infowindow = new google.maps.InfoWindow({
            content: `
            <h3>${item.name}</h3>
            <h5>Alimentos prioritários:<br>${this.getPriorityFoods(item)}</h5>
            <a href="/instituicao/${item.uid}" target="_blank">Fazer doação</a>
            `,
          });
          mrk.addListener("click", () => {
            if(this.currentWindom) this.currentWindom.close();
            this.currentWindom = infowindow.open(this.map, mrk);
          });
          this.markers.push(mrk);
        });
    });
  }

  getPriorityFoods(inst: Institution): string[] {
    return this.foods.filter((f) => inst.foodNeeded.includes(f.id))
      .map(f=> " " + f.title);
  }
}
