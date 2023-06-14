import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
  @Output() redEmit = new EventEmitter<number>();
  @Output() greenEmit = new EventEmitter<number>();
  @Output() reset = new EventEmitter();
  boardLines: IBoardModel[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const {floorWidth, floorHeight, boardWidth, boardHeight} = changes;
    this.reset.emit();
    this.floorWidth = floorWidth?.currentValue ?? this.floorWidth;
    this.floorHeight = floorHeight?.currentValue ?? this.floorHeight;
    this.boardWidth = boardWidth?.currentValue ?? this.boardWidth;
    this.boardHeight = boardHeight?.currentValue ?? this.boardHeight;
    this.calculations();
  }

  calculations() {
    this.boardLines = [];
    const isValid = this.boardWidth > 19 && this.boardHeight > 19;
    if (isValid) {
      const heightCount = Math.floor(this.floorHeight / this.boardHeight);
      if (isFinite(heightCount)) {
        for (let i = 1; i < heightCount + 1; i++) {
          this.createLine(i, this.floorWidth, this.boardWidth, this.boardHeight);
        }
        const remainderHeight = Math.floor(this.floorHeight % this.boardHeight);
        this.createLine(heightCount + 1, this.floorWidth, this.boardWidth, remainderHeight);
      }
    }
  }

  createLine(index: number, floorWidth: number, boardWidth: number, boardHeight: number) {
    const indent = index % 2 == 0;
    floorWidth -= indent ? boardWidth / 2 : 0;
    let widthCount = Math.floor(floorWidth / boardWidth);
    if (isFinite(widthCount)) {
      let remainderWidth = Math.floor(floorWidth % boardWidth);
      this.boardLines.push({indent, height: boardHeight, width: boardWidth, count: widthCount, remainder: remainderWidth})
    }
  }
}
