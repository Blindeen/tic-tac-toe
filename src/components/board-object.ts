import { CellObject } from "./cell-object";
import { AutoBind } from "../utilities/autobind";
import { gameState } from "../state/game-state";

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
    const cell = gameState.cells[index];
    const newCellObject = new CellObject(cellElement, cell);
    this.cellObjects.push(newCellObject);
  }
}

export { BoardObject };
