import { UserApp } from '../user/user-app.model';
import { User } from '../user/user.model';

export class Donation {

    createdAt: Date;
    instituicao: UserApp;
    doador: UserApp;
    tipoEntrega: 'presencial' | 'telebusca';
    tipo: number;
    quantidade: number;
    mensagem: string;

}