import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { LoadingComponent } from "app/components/loading/loading.component";
import { Injectable } from "@angular/core";

@Injectable()
export class LoadingService {

    constructor(private dialog: MatDialog){}

    show(): MatDialogRef<any> {
        return this.dialog.open(LoadingComponent, {
            data: {
              message: 'Carregando...'
            },
            disableClose: true
          });
    }

    close(ref: MatDialogRef<any>) {
        ref.close();
    }
}