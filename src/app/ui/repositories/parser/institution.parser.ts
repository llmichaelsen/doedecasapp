import { FoodParser } from "./food.parser";
import { WorkingTimeParser } from "./working-time.parser";
import { AddressParser } from "./address.parser";
import { Institution } from "./../../models/user/institution.model";
import { AbstractParser } from "./parser";
import { Injectable } from "@angular/core";

@Injectable()
export class InstitutionParser extends AbstractParser<Institution> {
  constructor(
    private addressParser: AddressParser,
    private workingTimeParser: WorkingTimeParser,
    private foodParser: FoodParser
  ) {
    super();
  }

  parse(payload): Institution {
    const institution: Institution = new Institution();
    if (!payload) return institution;

    const info = payload.val();

    institution.uid = payload.key || payload.uid;
    institution.key = payload.key || payload.uid;
    institution.name = info.name;
    institution.cpnj = info.cpnj;
    institution.description = info.description;
    institution.address = this.addressParser.parse(info.address);
    institution.responsibleFirstName = info.responsibleFirstName;
    institution.responsibleLastName = info.responsibleLastName;
    institution.responsiblePhone = info.responsiblePhone;
    institution.responsibleRole = info.responsibleRole;
    institution.foodNeeded = info.foodNeeded || [];
    institution.enableDonation = info.enableDonation;
    institution.workingTime = this.workingTimeParser.parse(info.workingTime);
    return institution;
  }

  reparse(payload): Institution {
    const institution: Institution = new Institution();
    if (!payload) return institution;

    const info = payload;

    institution.name = info.name;
    institution.cpnj = info.cpnj;
    institution.description = info.description;
    institution.address = this.addressParser.reparse(info.address);
    institution.responsibleFirstName = info.responsibleFirstName;
    institution.responsibleLastName = info.responsibleLastName;
    institution.responsiblePhone = info.responsiblePhone;
    institution.responsibleRole = info.responsibleRole;
    institution.foodNeeded = info.foodNeeded || [];
    institution.enableDonation = info.enableDonation;
    institution.workingTime = this.workingTimeParser.reparse(info.workingTime);
    return institution;
  }
}
