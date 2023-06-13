import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IBoardModel } from "../models/board";

@Component({
  selector: 'floor-component',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnChanges {
  @Input() floorWidth = 0;
  @Input() floorHeight = 0;
  @Input() boardWidth = 0;
  @Input() boardHeight = 0;

  boardLines: IBoardModel[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const {floorWidth, floorHeight, boardWidth, boardHeight} = changes;
    if (floorWidth && floorWidth.currentValue) {
      this.floorWidth = floorWidth.currentValue;
    }
    if (floorHeight && floorHeight.currentValue) {
      this.floorHeight = floorHeight.currentValue;
    }
    if (boardWidth && boardWidth.currentValue) {
      this.boardWidth = boardWidth.currentValue;
    }
    if (boardHeight && boardHeight.currentValue) {
      this.boardHeight = boardHeight.currentValue;
    }
    this.calculations();
  }

  calculations() {
    if (this.boardWidth > 19 && this.boardHeight > 19) {
      const heightCount = Math.floor(this.floorHeight / this.boardHeight);
      this.boardLines = [];
      if (isFinite(heightCount)) {
        for (let i = 1; i < heightCount + 1; i++) {
          this.createLine(i, this.floorWidth, this.boardWidth, this.boardHeight);
        }
        const remainderHeight = Math.floor(this.floorHeight % this.boardHeight);
        this.createLine(heightCount + 1, this.floorWidth, this.boardWidth, remainderHeight);
      }
    } else {
      this.boardLines = [];
    }
  }

  createLine(index: number, floorWidth: number, boardWidth: number, boardHeight: number) {
    const indent = index % 2 == 0;
    if (indent) {
      floorWidth -= boardWidth / 2;
    }
    let widthCount = Math.floor(floorWidth / boardWidth);
    if (isFinite(widthCount)) {
      let remainderWidth = Math.floor(floorWidth % boardWidth);
      this.boardLines.push({indent, height: boardHeight, width: boardWidth, count: widthCount, remainder: remainderWidth})
    }
  }
}
