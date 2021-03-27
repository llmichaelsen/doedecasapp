import { Component, OnInit } from '@angular/core';
import { DonationOffer } from 'app/ui/models/donation/donation-offer';
//import { DonationService } from 'app/ui/services/donation.service';

@Component({
  selector: 'app-minhas-doacoes',
  templateUrl: './minhas-doacoes.component.html',
  styleUrls: ['./minhas-doacoes.component.css']
})
export class MinhasDoacoesComponent implements OnInit {

  displayedColumns: string[] = ['data', 'instituicao', 'tipo', 'quantidade', 'mensagem'];
  dataSource: DonationOffer[] = [];

  constructor(
    //private donationServ: DonationService
  ) { }

  async ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

    //this.dataSource = await this.donationServ.getDonations();
  }
  ngOnDestroy(){
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];