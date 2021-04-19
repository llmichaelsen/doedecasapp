import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MessageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MessageModalData,
  ) { }

  ngOnInit(): void {}

  close(result: boolean) {
    this.dialogRef.close(result);
  }

}

export interface MessageModalData {
  readonly type: MessageModalType;
  readonly text: string;
}

export type MessageModalType = 'success' | 'warning' | 'error';
