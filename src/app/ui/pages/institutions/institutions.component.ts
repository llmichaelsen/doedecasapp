import { Component, OnInit } from '@angular/core';
import { UserType } from 'app/ui/models/user/user-type.enum';
import { UserApp } from 'app/ui/models/user/user-app.model';
import { UserService } from 'app/ui/services/user.service';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.scss']
})
export class InstitutionsComponent implements OnInit {

  institutions: UserApp[];

  constructor(
    private service: UserService
  ) { }

  async ngOnInit() {
    this.loadPage();

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }
  ngOnDestroy(){
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  async loadPage(): Promise<void> {
    this.institutions = await this.service.getUsers(UserType.Instituiçao)
  }
}
