import { AutoBind } from "../utilities/autobind";
import { TurnStatus, gameState } from "../state/game-state";

class StatusDisplayObject {
  private element: HTMLDivElement;
  private shapeSlotElement: HTMLDivElement;
  private circleTemplateElement: HTMLTemplateElement;
  private crossTemplateElement: HTMLTemplateElement;

  constructor() {
    this.element = document.getElementById("status-display")! as HTMLDivElement;
    this.shapeSlotElement = this.element.querySelector(
      "#shape-slot"
    )! as HTMLDivElement;
    this.circleTemplateElement = document.getElementById(
      "circle-template"
    )! as HTMLTemplateElement;
    this.crossTemplateElement = document.getElementById(
      "cross-template"
    )! as HTMLTemplateElement;
    this.configure();
  }

  private configure() {
    gameState.registerUpdateStatusEvent(this.drawCurrentShape);
  }

  @AutoBind
  private drawCurrentShape(turn: TurnStatus) {
    const shapeTemplate =
      turn === TurnStatus.Circle
        ? this.circleTemplateElement
        : this.crossTemplateElement;
    const shapeElement = document.importNode(
      shapeTemplate.content.firstElementChild!,
      true
    );
    this.shapeSlotElement.innerHTML = "";
    this.shapeSlotElement.appendChild(shapeElement);
  }
}

export { StatusDisplayObject };
