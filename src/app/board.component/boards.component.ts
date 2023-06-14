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
    this.width = floorWidth?.currentValue ?? this.width;
    this.height = floorHeight?.currentValue ?? this.height;
    this.pushColor();
  }

  pushColor() {
    this.colors = Array.from({length: this.count + 2}, (v, i) => this.randomColor(i));
  }

  px(value: number) {
    return value + ".px";
  }

  get widthPx() {
    return this.px(this.width);
  }

  get heightPx() {
    return this.px(this.height);
  }

  get remainderPx() {
    return this.px(this.remainder);
  }

  get halfBoard() {
    return this.px(Math.floor(Number(this.width) / 2));
  }

  countBoard() {
    return new Array(this.count)
  }

  randomColor(index: number) {
    const color = Math.random() > 0.5 ? "red" : "green";
    this.areaCalculation(color === "red", index);
    return color;
  }

  areaCalculation(color: boolean, index: number) {
    const areaOneBoard = this.width * this.height;
    let area = 0;
    const isIndent = index === 0 && this.indent;
    const isRemainder = index === this.count + 1;
    const isNormal = index > 0;
    area += isIndent ? areaOneBoard / 2 : isRemainder ? this.remainder * this.height : isNormal ? areaOneBoard : 0;
    color ? this.redEmit.emit(area) : this.greenEmit.emit(area);
  }
}
