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

  customCallback(callback: Function) {
    callback();
    this.close(true);
  }

}

export interface MessageModalData {
  readonly type: MessageModalType;
  readonly text: string;
  readonly buttons: Array<{text: string, callback: Function}>;
}

export type MessageModalType = 'success' | 'warning' | 'error';
