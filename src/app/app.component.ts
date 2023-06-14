import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';

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
  boardWidth = 100;
  boardHeight = 50;
  redArea = 0;
  greenArea = 0;

  constructor(private cdRef: ChangeDetectorRef) {
  }

  clear() {
    this.redArea = 0;
    this.greenArea = 0;
    this.cdRef.detectChanges();
  }

  saveRed(value: number) {
    this.redArea += value;
    this.cdRef.detectChanges();
  }

  saveGreen(value: number) {
    this.greenArea += value;
    this.cdRef.detectChanges();
  }

  get floorArea() {
    return this.floorWidth * this.floorHeight;
  }

  boardArea() {
    const value = this.boardWidth * this.boardHeight;
    if (value != 0) {
      return value;
    }
    return 1;
  }

  get numberRedBoards() {
    return Math.ceil(this.redArea / this.boardArea());
  }

  get numberGreenBoards() {
    return Math.ceil(this.greenArea / this.boardArea());
  }
}
