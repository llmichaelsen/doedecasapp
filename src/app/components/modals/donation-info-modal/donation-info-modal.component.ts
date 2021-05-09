import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-donation-info-modal',
  templateUrl: './donation-info-modal.component.html',
  styleUrls: ['./donation-info-modal.component.css']
})
export class DonationInfoModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DonationInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    console.log(this.data)
  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }

}
