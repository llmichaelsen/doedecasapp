import { Institution } from './../../models/user/institution.model';
import { InstitutionService } from './../../services/institution.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.scss']
})
export class InstitutionsComponent implements OnInit {

  institutions: Institution[];

  constructor(
    private service: InstitutionService
  ) { }

  async ngOnInit() {
    this.loadPage();

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
  }
  ngOnDestroy(){
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
  }

  async loadPage(): Promise<void> {
    this.institutions = await this.service.list();
  }
}
