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
    const random = Math.random();
    const {floorWidth, floorHeight} = changes;
    if (floorWidth && floorWidth.currentValue) {
      this.width = floorWidth.currentValue;
    }
    if (floorHeight && floorHeight.currentValue) {
      this.height = floorHeight.currentValue;
    }
    this.pushColor(random);
  }

  pushColor(random: number) {
    for (let i = 0; i < this.count + 2; i++) {
      this.colors.push(this.randomColor(i, random));
    }
    console.log(this.indent, this.colors, random);
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

  randomColor(index: number, random: number) {
    if (Math.random() > 0.5) {
      this.areaCalculation(true, index, random);
      return "red";
    } else {
      this.areaCalculation(false, index, random);
      return "green";
    }
  }

  areaCalculation(color: boolean, index: number, random: number) {
    const areaOneBoard = this.width * this.height;
    console.log("index ", index, this.indent, this.count, random)
    let area = 0;
    if (index === 0 && this.indent) {
      area += areaOneBoard / 2;
    } else if (index === this.count + 1) {
      const remainderArea = this.remainder * this.height
      area += remainderArea;
      console.log("ADD remainderArea", color, remainderArea, random);
    } else if (index > 0) {
      area += areaOneBoard;
      console.log("ADD areaOneBoard", color, random);
    }
    if (color) {
      console.log("area red", area, random);
      this.redEmit.emit(area);
    } else {
      console.log("area green", area, random);
      this.greenEmit.emit(area);
    }
  }
}
