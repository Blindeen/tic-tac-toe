import { Cell } from "../models/cell";

enum TurnStatus {
  Circle,
  Cross,
}

class GameState {
  private static instance: GameState;

  private _cells: Cell[];
  private _turn: TurnStatus;

  private constructor() {
    this._cells = [];
    this._turn = TurnStatus.Circle;
    this.configure();
  }

  private configure() {
    const cellElements = document.querySelectorAll(".cell");
    cellElements.forEach((_, idx) => this._cells.push(new Cell(idx + 1)));
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new GameState();
    }
    return this.instance;
  }

  public get cells() {
    return this._cells;
  }

  public get turn() {
    return this._turn;
  }

  public nextTurn() {
    this._turn =
      this._turn === TurnStatus.Circle ? TurnStatus.Cross : TurnStatus.Circle;
  }
}

const gameState = GameState.getInstance();

export { TurnStatus, gameState };
