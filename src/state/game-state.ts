import { Cell, CellStatus } from "../models/cell";

enum TurnStatus {
  Circle,
  Cross,
}

type Combination = [number, number, number];

type HighlightEvent = (combination: [number, number, number]) => void;

type UpdateStatusEvent = () => void;

class GameState {
  private static instance: GameState;

  private dimension: number;
  private _cells: Cell[];
  private _turn: TurnStatus;
  private _isGameFinished: boolean;
  private _winningCombinations: Combination[];
  private winningCombination?: Combination;
  private highlightEvent?: HighlightEvent;
  private updateStatusEvent?: UpdateStatusEvent;

  private constructor() {
    this.dimension = 3;
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
    const numberOfCells = Math.pow(this.dimension, 2);
    for (let i = 0; i < numberOfCells; i++) {
      this._cells.push(new Cell(i));
    }
  }

  private isGameOver() {
    for (const combination of this._winningCombinations) {
      const containsOnlyCircle = combination.every(
        (idx) => this._cells[idx].status === CellStatus.Circle
      );
      const containsOnlyCross = combination.every(
        (idx) => this._cells[idx].status === CellStatus.Cross
      );

      if (containsOnlyCircle || containsOnlyCross) {
        this.winningCombination = combination;
        return true;
      }
    }

    const isDraw = this._cells.every(
      (cell) => cell.status !== CellStatus.Empty
    );

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
    if (this.isGameOver()) {
      this._isGameFinished = true;
      if (this.highlightEvent && this.winningCombination) {
        this.highlightEvent(this.winningCombination);
      }
    } else {
      this._turn =
        this._turn === TurnStatus.Circle ? TurnStatus.Cross : TurnStatus.Circle;
      this.updateStatusEvent?.();
    }
  }

  public registerHighlightEvent(event: HighlightEvent) {
    this.highlightEvent = event;
  }

  public registerUpdateStatusEvent(event: UpdateStatusEvent) {
    this.updateStatusEvent = event;
  }
}

const gameState = GameState.getInstance();

export { TurnStatus, Combination, gameState };
