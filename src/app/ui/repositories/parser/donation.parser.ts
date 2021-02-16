import { InstitutionParser } from './institution.parser';
import { DonatorParser } from './donator.parser';
import { AbstractParser } from "./parser";
import { Injectable } from "@angular/core";
import { Donation } from 'app/ui/models/donation/donation';
import { UserParser } from './user-app.parser';

@Injectable()
export class DonationParser extends AbstractParser<Donation> {

    constructor(
        private donatorParser: DonatorParser,
        private institutionParser: InstitutionParser
    ){
        super();
    }
    
    parse(payload): Donation {
        const donation: Donation = new Donation();
        if(!payload) return donation;

        const data = payload.payload.val();

        donation.instituicao = this.institutionParser.reparse(data.instituicao);
        donation.createdAt = new Date(data.createdAt);
        donation.doador = this.donatorParser.reparse(data.doador);
        donation.tipo = data.tipo;
        donation.quantidade = data.quantidade;
        donation.mensagem = data.mensagem;
        return donation;
    }
}