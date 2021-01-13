import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/ui/services/user.service';
import { UserApp } from 'app/ui/models/user/user-app.model';
import { UserType } from 'app/ui/models/user/user-type.enum';
import { LoadingService } from 'app/ui/services/loading.service';
import { FirebaseGateway } from 'app/ui/gateway/firebase.gateway';
import { AuthService } from 'app/ui/services/auth.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  users: UserApp[];

  constructor(private userServ: UserService,
    private loadingServ: LoadingService) { }

  async ngOnInit() {
    const a = await this.userServ.getUser();
    console.log(a)
    this.loadUsers();
  }
  
  async loadUsers(): Promise<void> {
    const load = this.loadingServ.show();
    try {
      this.users = await this.userServ.getUsers(UserType.Doador);
    }
    finally {
      load.close();
    }
  }

  async deleteUser(user: UserApp) :Promise<void> {
    const result = await this.userServ.deleteUser(user);
    this.loadUsers()
  }

}
