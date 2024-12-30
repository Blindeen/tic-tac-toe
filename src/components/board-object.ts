import { CellObject } from "./cell-object";
import { AutoBind } from "../utilities/autobind";

class BoardObject {
  private element: HTMLDivElement;
  private cellObjects: CellObject[];

  constructor() {
    this.element = document.getElementById("board")! as HTMLDivElement;
    this.cellObjects = [];
    this.configure();
  }

  private configure() {
    const cellElements = this.element.querySelectorAll(".cell");
    cellElements.forEach(this.initializeCellObject);
  }

  @AutoBind
  private initializeCellObject(element: Element, index: number) {
    const cellElement = element as HTMLDivElement;
    const cellId = index + 1;
    const newCellObject = new CellObject(cellElement, cellId);
    this.cellObjects.push(newCellObject);
  }
}

export { BoardObject };
