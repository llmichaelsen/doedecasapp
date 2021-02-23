import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DonationService } from './../../ui/services/donation.service';
import { LoadingService } from './../../ui/services/loading.service';
import { Validators, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-donate-modal',
  templateUrl: './donate-modal.component.html',
  styleUrls: ['./donate-modal.component.css']
})
export class DonateModalComponent implements OnInit {


  donationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingServ: LoadingService,
    private donationServ: DonationService,
    public dialogRef: MatDialogRef<DonateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.donationForm = this.fb.group({
      doador: [''],//mudar
      instituicao: [''],//mudar
      tipo: [null, Validators.required],
      createdAt: [new Date().getTime()],
      quantidade: [null, Validators.required],
      tipoEntrega: [null, Validators.required],
      mensagem: ['']
    });
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

  close(result: boolean){
    this.dialogRef.close(result)
  }

  async successMessage(formDirective: FormGroupDirective): Promise<void> {
    this.createForm();
    formDirective.resetForm();
    this.close(true);
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
