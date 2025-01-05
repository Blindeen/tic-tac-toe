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
    const cells = gameState.cells;
    cells.forEach(this.initializeCell);
  }

  @AutoBind
  private initializeCell(cell: Cell) {
    const cellTemplate = document.getElementById(
      "cell-template"
    )! as HTMLTemplateElement;
    const cellElement = document.importNode(
      cellTemplate.content.firstElementChild!,
      true
    ) as HTMLDivElement;
    const newCellObject = new CellObject(cellElement, cell);
    this.cellObjects.push(newCellObject);
    this.element.appendChild(cellElement);
  }
}

export { BoardObject };
