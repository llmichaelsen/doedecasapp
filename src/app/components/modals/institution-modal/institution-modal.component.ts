import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FoodService } from 'app/ui/services/food.service';

@Component({
  selector: 'app-institution-modal',
  templateUrl: './institution-modal.component.html',
  styleUrls: ['./institution-modal.component.css']
})
export class InstitutionModalComponent implements OnInit {

  foods = [];

  constructor(
    public dialogRef: MatDialogRef<InstitutionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private foodServ: FoodService
  ) { }

  async ngOnInit() {
    this.foods = await this.foodServ.list();
  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }

  getPriorityFoods(): string[] {
    return this.foods.filter((f) => this.data.foodNeeded.includes(f.id))
      .map(f=> " " + f.title);
  }


}
