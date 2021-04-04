import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-donator-info-modal',
  templateUrl: './donator-info-modal.component.html',
  styleUrls: ['./donator-info-modal.component.css']
})
export class DonatorInfoModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DonatorInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }

}
