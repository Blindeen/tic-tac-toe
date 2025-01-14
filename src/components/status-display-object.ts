import { AutoBind } from "../utilities/autobind";
import { TurnStatus, gameState } from "../state/game-state";

class StatusDisplayObject {
  private element: HTMLDivElement;
  private circleIndicatorElement: HTMLDivElement;
  private crossIndicatorElement: HTMLDivElement;

  constructor() {
    this.element = document.getElementById("status-display")! as HTMLDivElement;
    this.circleIndicatorElement = this.element.querySelector(
      ".indicator.circle-indicator"
    )! as HTMLDivElement;
    this.crossIndicatorElement = this.element.querySelector(
      ".indicator.cross-indicator"
    )! as HTMLDivElement;
    this.configure();
  }

  private configure() {
    gameState.registerUpdateStatusEvent(this.drawCurrentShape);
  }

  @AutoBind
  private drawCurrentShape(turn: TurnStatus) {
    if (turn === TurnStatus.Circle) {
      this.circleIndicatorElement.classList.add("active-indicator");
      this.crossIndicatorElement.classList.remove("active-indicator");
    } else {
      this.circleIndicatorElement.classList.remove("active-indicator");
      this.crossIndicatorElement.classList.add("active-indicator");
    }
  }
}

export { StatusDisplayObject };
