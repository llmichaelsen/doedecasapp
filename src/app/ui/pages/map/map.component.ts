import { Marker } from "./../../models/map/marker";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit {
  constructor() {}

  lat: number;
  lng: number;
  markers: Marker[] = [];

  ngOnInit(): void {
    console.log('')
    this.requestPosition();
  }

  requestPosition(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (result) => this.setMap(result),
        (error) => {
          if (error.code === 1) {
            alert(
              "Favor permita acesso a sua localização para centralizar em sua localidade."
            );
          }
        }
      );
    }
  }

  setMap(position: any): void {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
  }
}
