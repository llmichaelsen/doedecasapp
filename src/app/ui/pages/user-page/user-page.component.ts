import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserApp } from 'app/ui/models/user/user-app.model';
import { AuthService } from 'app/ui/services/auth.service';
import { DonationService } from 'app/ui/services/donation.service';
import { LoadingService } from 'app/ui/services/loading.service';
import { UserService } from 'app/ui/services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  userLogado: UserApp;
  instituicao: UserApp;
  uid: string;
  editModal: NgbModalRef;

  donationForm: FormGroup;

  constructor(
    private userServ: UserService,
    private loadingServ: LoadingService,
    public authServ: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private donationServ: DonationService
  ) {
    this.uid = this.route.snapshot.paramMap.get('id');
  }

  async ngOnInit() {

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');

    this.instituicao = await this.userServ.getUseById(this.uid);
    this.userLogado = await this.userServ.getUser();
    this.createForm();
  }

  createForm() {
    this.donationForm = this.fb.group({
      doador: [this.userLogado],
      instituicao: [this.instituicao],
      tipo: [null, Validators.required],
      createdAt: [new Date().getTime()],
      quantidade: [null, Validators.required],
      tipoEntrega: [null, Validators.required],
      mensagem: ['']
    });
  }

  donation(content): void {
    if (!this.authServ.isLoggedIn) {
      alert('É preciso estar logado para fazer doações.')
      return;
    }
    this.editModal = this.modalService.open(content, { size: 'md' });
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (this.donationForm.invalid) {
      return;
    }

    const load = this.loadingServ.show();
    this.donationServ.saveDonation(this.donationForm.getRawValue())
      .then(() => this.successMessage(formDirective))
      .catch(error => console.log(error))
      .finally(() => this.loadingServ.close(load));
  }

  async successMessage(formDirective: FormGroupDirective): Promise<void> {
    this.createForm();
    formDirective.resetForm();
    this.editModal.close();
  }

  alimentos = [
    { nome: 'Arroz', valor: 'Arroz' },
    { nome: 'Feijão', valor: 'Feijão' },
    { nome: 'Açucar', valor: 'Açucar' },
    { nome: 'Leite', valor: 'Leite' },
    { nome: 'Farinha de Trigo', valor: 'Farinha de Trigo' },
    { nome: 'Farinha de Milho', valor: 'Farinha de Milho' },
  ]
}
