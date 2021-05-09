import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  constructor(private _snackBar: MatSnackBar) {}

  openError(message: string) {
    this._snackBar.open(message, "Ok", {
      duration: 3000,
      panelClass: 'error'
    });
  }

  openSuccess(message: string) {
    this._snackBar.open(message, "Ok", {
      duration: 3000,
      panelClass: 'success'
    });
  }

}
