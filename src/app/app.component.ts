import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Output() redEmit = new EventEmitter<number>();
  @Output() greenEmit = new EventEmitter<number>();
  floorWidth = 500;
  floorHeight = 500;
  boardWidth = 90;
  boardHeight = 40;
  redArea = 0;
  greenArea = 0;

  saveRed(value: number) {
    this.redArea += value;
    console.log("redArea + greenArea", this.redArea + this.greenArea);
  }

  saveGreen(value: number) {
    this.greenArea += value;
    console.log("redArea + greenArea", this.redArea + this.greenArea);
  }
}
