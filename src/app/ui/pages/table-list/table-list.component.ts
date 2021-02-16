import { DonatorService } from './../../services/donator.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/ui/services/user.service';
import { UserApp } from 'app/ui/models/user/user-app.model';
import { UserType } from 'app/ui/models/user/user-type.enum';
import { LoadingService } from 'app/ui/services/loading.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  users: UserApp[];

  constructor(private service: DonatorService,
    private loadingServ: LoadingService) { }

  async ngOnInit() {
    const a = await this.service.list();
    console.log(a)
    this.loadUsers();
  }
  
  async loadUsers(): Promise<void> {
    const load = this.loadingServ.show();
    try {
      this.users = await this.service.list();
    }
    finally {
      load.close();
    }
  }

  async deleteUser(user: UserApp) :Promise<void> {
    //await this.service.deleteUser(user);
    this.loadUsers()
  }

}
