enum TurnStatus {
  Circle,
  Cross,
}

class GameState {
  private static instance: GameState;
  private _turn: TurnStatus;

  private constructor() {
    this._turn = TurnStatus.Circle;
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new GameState();
    }
    return this.instance;
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
