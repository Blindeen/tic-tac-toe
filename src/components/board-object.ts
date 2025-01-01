import { CellObject } from "./cell-object";
import { AutoBind } from "../utilities/autobind";
import { gameState } from "../state/game-state";
import { Cell } from "../models/cell";

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
    cellElements.forEach(this.initializeCell);
  }

  @AutoBind
  private initializeCell(element: Element, index: number) {
    const cellElement = element as HTMLDivElement;
    const newCell = new Cell(index + 1);
    const newCellObject = new CellObject(cellElement, newCell);
    gameState.cells.push(newCell);
    this.cellObjects.push(newCellObject);
  }
}

export { BoardObject };
