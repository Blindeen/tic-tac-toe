import { Cell, CellStatus } from "../models/cell";
import { AutoBind } from "../utilities/autobind";
import { TurnStatus, gameState } from "../state/game-state";

class CellObject {
  private element: HTMLDivElement;
  private cell: Cell;

  constructor(element: HTMLDivElement, cell: Cell) {
    this.element = element;
    this.cell = cell;
    this.configure();
  }

  private configure() {
    this.element.addEventListener("click", this.onCellClick);
  }

  @AutoBind
  private onCellClick(_: Event) {
    if (!gameState.isGameFinished && this.cell.status === CellStatus.Empty) {
      const newShape = this.generateNewShape();
      this.cell.status =
        gameState.turn === TurnStatus.Circle
          ? CellStatus.Circle
          : CellStatus.Cross;
      this.element.appendChild(newShape);
      gameState.nextTurn();
    }
  }

  private generateNewShape() {
    const shapeTemplate = document.getElementById(
      `${gameState.turn === TurnStatus.Circle ? "circle" : "cross"}-template`
    )! as HTMLTemplateElement;
    return document.importNode(
      shapeTemplate.content.firstElementChild!,
      true
    ) as HTMLDivElement;
  }

  public highlight() {
    this.element.classList.add("highlight");
  }
}

export { CellObject };
