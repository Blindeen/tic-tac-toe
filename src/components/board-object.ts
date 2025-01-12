import { CellObject } from "./cell-object";
import { AutoBind } from "../utilities/autobind";
import { Combination, gameState } from "../state/game-state";
import { Cell } from "../models/cell";

class BoardObject {
  private element: HTMLDivElement;
  private cellTemplateElement: HTMLTemplateElement;
  private cellObjects: CellObject[];

  constructor() {
    this.element = document.getElementById("board")! as HTMLDivElement;
    this.cellTemplateElement = document.getElementById(
      "cell-template"
    )! as HTMLTemplateElement;
    this.cellObjects = [];
    this.configure();
  }

  private configure() {
    const cells = gameState.cells;
    cells.forEach(this.initializeCell);
    gameState.registerHighlightEvent(this.highlightWinningCombination);
  }

  @AutoBind
  private initializeCell(cell: Cell) {
    const cellElement = document.importNode(
      this.cellTemplateElement.content.firstElementChild!,
      true
    ) as HTMLDivElement;
    const newCellObject = new CellObject(cellElement, cell);
    this.cellObjects.push(newCellObject);
    this.element.appendChild(cellElement);
  }

  @AutoBind
  private highlightWinningCombination(combination: Combination) {
    combination.forEach((cellIdx, arrIdx) =>
      setTimeout(() => this.cellObjects[cellIdx].highlight(), arrIdx * 300)
    );
  }
}

export { BoardObject };
