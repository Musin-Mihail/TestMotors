import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'board-component',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnChanges {
  @Input() indent = false;
  @Input() width = 0;
  @Input() height = 0;
  @Input() remainder = 0;
  @Input() count = 0;
  @Output() redEmit = new EventEmitter<number>();
  @Output() greenEmit = new EventEmitter<number>();
  colors: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const {floorWidth, floorHeight} = changes;
    if (floorWidth && floorWidth.currentValue) {
      this.width = floorWidth.currentValue;
    }
    if (floorHeight && floorHeight.currentValue) {
      this.height = floorHeight.currentValue;
    }
    for (let i = 0; i < this.count + (this.indent ? 2 : 1); i++) {
      this.colors.push(this.randomColor(i));
    }
  }

  get widthPx() {
    return this.width + ".px";
  }

  get heightPx() {
    return this.height + ".px";
  }

  get remainderPx() {
    return this.remainder + ".px";
  }

  get halfBoard() {
    return Math.floor(Number(this.width) / 2) + ".px";
  }

  countBoard() {
    return new Array(this.count)
  }

  randomColor(index: number) {
    if (Math.random() > 0.5) {
      this.areaCalculation(true, index);
      return "red";
    } else {
      this.areaCalculation(false, index);
      return "green";
    }
  }

  areaCalculation(color: boolean, index: number) {
    const boardAreaOne = this.width * this.height;
    let area = 0;
    if (index === 0 && this.indent) {
      area += boardAreaOne / 2;
    } else if (index === this.count) {
      const remainderArea = this.remainder * this.height
      area += remainderArea;
    } else {
      area += boardAreaOne;
    }
    if (color) {
      this.redEmit.emit(area);
    } else {
      this.greenEmit.emit(area);
    }
  }
}
