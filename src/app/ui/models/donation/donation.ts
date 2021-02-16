import { Donator } from './../user/donator.model';
import { Institution } from './../user/institution.model';

export class Donation {

    createdAt: Date;
    instituicao: Institution;
    doador: Donator;
    tipoEntrega: 'presencial' | 'telebusca';
    tipo: number;
    quantidade: number;
    mensagem: string;

}