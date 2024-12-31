import { Cell, CellStatus } from "../models/cell";
import { AutoBind } from "../utilities/autobind";

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
      const shapeTemplate = document.getElementById(
        "circle-template"
      )! as HTMLTemplateElement;
      const newShape = document.importNode(
        shapeTemplate.content.firstElementChild!,
        true
      );
      this.cell.status = CellStatus.Circle;
      this.element.appendChild(newShape);
    }
  }
}

export { CellObject };
