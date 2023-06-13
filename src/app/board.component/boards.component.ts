import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

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

  ngOnChanges(changes: SimpleChanges): void {
    const {floorWidth, floorHeight} = changes;
    if (floorWidth && floorWidth.currentValue) {
      this.width = floorWidth.currentValue;
    }
    if (floorHeight && floorHeight.currentValue) {
      this.height = floorHeight.currentValue;
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

  halfBoard() {
    return Math.floor(Number(this.width) / 2) + ".px";
  }

  countBoard() {
    return new Array(this.count)
  }
}
