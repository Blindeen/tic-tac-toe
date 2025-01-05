import { Cell, CellStatus } from "../models/cell";

enum TurnStatus {
  Circle,
  Cross,
}

class GameState {
  private static instance: GameState;

  private _dimension: number;
  private _cells: Cell[];
  private _turn: TurnStatus;
  private _isGameFinished: boolean;
  private _winningCombinations: [number, number, number][];

  private constructor() {
    this._dimension = 3;
    this._cells = [];
    this._turn = TurnStatus.Circle;
    this._isGameFinished = false;
    this._winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    this.configure();
  }

  private configure() {
    const numberOfCells = Math.pow(this._dimension, 2);
    for (let i = 0; i < numberOfCells; i++) {
      this._cells.push(new Cell(i));
    }
  }

  private containsSameShape(combination: [number, number, number]) {
    const containsOnlyCircle = combination.every(
      (idx) => this._cells[idx].status === CellStatus.Circle
    );
    const containsOnlyCross = combination.every(
      (idx) => this._cells[idx].status === CellStatus.Cross
    );

    return containsOnlyCircle || containsOnlyCross;
  }

  private isGameOver() {
    for (const combination of this._winningCombinations) {
      if (this.containsSameShape(combination)) {
        this._isGameFinished = true;
        return true;
      }
    }

    const isDraw = this._cells.every(
      (cell) => cell.status !== CellStatus.Empty
    );
    if (isDraw) {
      this._isGameFinished = true;
    }

    return isDraw;
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

  public get isGameFinished() {
    return this._isGameFinished;
  }

  public nextTurn() {
    if (!this.isGameOver()) {
      this._turn =
        this._turn === TurnStatus.Circle ? TurnStatus.Cross : TurnStatus.Circle;
    }
  }
}

const gameState = GameState.getInstance();

export { TurnStatus, gameState };
