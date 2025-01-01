import { Cell, CellStatus } from "../models/cell";
import { AutoBind } from "../utilities/autobind";
import { TurnStatus, gameState } from "../state/game-state";

class CellObject {
  private element: HTMLDivElement;
  private cell: Cell;

  constructor(element: HTMLDivElement, id: number) {
    this.element = element;
    this.cell = new Cell(id);
    this.configure();
  }

  private configure() {
    this.element.addEventListener("click", this.onCellClick);
  }

  @AutoBind
  private onCellClick(_: Event) {
    if (this.cell.status === CellStatus.Empty) {
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
}

export { CellObject };
