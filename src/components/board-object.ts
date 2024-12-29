import { CellObject } from "./cell-object";

class BoardObject {
  private element: HTMLDivElement;
  private cellObjects: CellObject[];

  constructor() {
    this.element = document.getElementById("board")! as HTMLDivElement;
    this.cellObjects = [];

    const cellElements = this.element.querySelectorAll(".cell");
    cellElements.forEach((el, idx) => {
      const cellElement = el as HTMLDivElement;
      const cellId = idx + 1;
      const newCellObject = new CellObject(cellElement, cellId);
      this.cellObjects.push(newCellObject);
    });
  }
}

export { BoardObject };
