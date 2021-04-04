import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-institution-info-modal',
  templateUrl: './institution-info-modal.component.html',
  styleUrls: ['./institution-info-modal.component.css']
})
export class InstitutionInfoModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<InstitutionInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {}

  close(result: boolean) {
    this.dialogRef.close(result);
  }

}
