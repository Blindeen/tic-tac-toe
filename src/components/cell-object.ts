import { Cell } from "../models/cell";

class CellObject {
  private element: HTMLDivElement;
  private cell: Cell;

  constructor(element: HTMLDivElement, cell: Cell) {
    this.element = element;
    this.cell = cell;
  }
}

export { CellObject };
