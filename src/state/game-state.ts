import { Cell, CellStatus } from "../models/cell";

enum TurnStatus {
  Circle,
  Cross,
}

class GameState {
  private static instance: GameState;

  private _cells: Cell[];
  private _turn: TurnStatus;
  private _isGameFinished: boolean;

  private constructor() {
    this._cells = [];
    this._turn = TurnStatus.Circle;
    this._isGameFinished = false;
  }

  private containsSameShape(axis: Cell[]) {
    const containsOnlyCircle = axis.every(
      (cell) => cell.status === CellStatus.Circle
    );
    const containsOnlyCross = axis.every(
      (cell) => cell.status === CellStatus.Cross
    );

    return containsOnlyCircle || containsOnlyCross;
  }

  private isGameOver() {
    const dimension = Math.sqrt(this._cells.length);

    for (let i = 0; i < this._cells.length; i += dimension) {
      const row = this._cells.slice(i, i + dimension);
      if (this.containsSameShape(row)) {
        this._isGameFinished = true;
        return true;
      }
    }

    for (let i = 0; i < dimension; i++) {
      const column: Cell[] = [];
      for (let j = 0; j <= i + 1 + 2 * dimension; j += dimension) {
        column.push(this._cells[i + j]);
      }
      if (this.containsSameShape(column)) {
        this._isGameFinished = true;
        return true;
      }
    }

    const leftDiagonal: Cell[] = [];
    for (let i = 0; i < this._cells.length; i += dimension + 1) {
      leftDiagonal.push(this._cells[i]);
    }
    if (this.containsSameShape(leftDiagonal)) {
      this._isGameFinished = true;
      return true;
    }

    const rightDiagonal: Cell[] = [];
    for (
      let i = dimension - 1;
      i < this._cells.length - dimension + 1;
      i += dimension - 1
    ) {
      rightDiagonal.push(this._cells[i]);
    }
    if (this.containsSameShape(rightDiagonal)) {
      this._isGameFinished = true;
      return true;
    }

    return this._cells.every((cell) => cell.status !== CellStatus.Empty);
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
