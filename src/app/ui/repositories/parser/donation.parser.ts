import { AbstractParser } from "./parser";
import { Injectable } from "@angular/core";
import { Donation } from 'app/ui/models/donation/donation';
import { UserParser } from './user.parser';

@Injectable()
export class DonationParser extends AbstractParser<Donation> {

    constructor(
        private userParser: UserParser
    ){
        super();
    }
    
    parse(payload): Donation {
        const donation: Donation = new Donation();
        if(!payload) return donation;

        const data = payload.payload.val();

        donation.instituicao = this.userParser.reparse(data.instituicao);
        donation.createdAt = new Date(data.createdAt);
        donation.doador = this.userParser.reparse(data.doador);
        donation.tipo = data.tipo;
        donation.quantidade = data.quantidade;
        donation.mensagem = data.mensagem;
        return donation;
    }
}