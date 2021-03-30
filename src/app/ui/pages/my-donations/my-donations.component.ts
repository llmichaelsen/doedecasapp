import { Component, OnInit } from "@angular/core";

@Component({
  selector: "my-donations",
  templateUrl: "./my-donations.component.html",
  styleUrls: ["./my-donations.component.css"],
})
export class MyDonationsComponent implements OnInit {
  constructor() {}

  async ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("landing-page");
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("landing-page");
  }
}
