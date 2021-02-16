import { InstitutionParser } from "./institution.parser";
import { DonatorParser } from "./donator.parser";
import { UserType } from "app/ui/models/user/user-type.enum";
import { UserApp } from "app/ui/models/user/user-app.model";
import { AbstractParser } from "./parser";
import { AddressParser } from "./address.parser";
import { Injectable } from "@angular/core";

@Injectable()
export class UserParser extends AbstractParser<UserApp> {
  constructor(
    private donatorParser: DonatorParser,
    private institutionParser: InstitutionParser
  ) {
    super();
  }

  parse(payload): UserApp {
    const user = new UserApp();
    if (!payload) return user;

    user.password = payload.password;
    user.uid = payload.uid;
    user.type = payload.type;
    user.email = payload.email;

    return user;
  }

  reparse(payload): UserApp {
    let user = new UserApp();
    if (!payload) return user;

    if (payload.type === UserType.Doador)
      user = this.donatorParser.reparse(payload);

    if (payload.type === UserType.Instituiçao)
      user = this.institutionParser.reparse(payload);

    user.key = payload.key;
    user.password = payload.password;
    user.uid = payload.uid;
    user.email = payload.email;
    return user;
  }
}
