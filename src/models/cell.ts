enum CellStatus {
  Empty,
  Circle,
  Cross,
}

class Cell {
  public id: number;
  public status: CellStatus;

  constructor(id: number) {
    this.id = id;
    this.status = CellStatus.Empty;
  }
}

export { Cell, CellStatus };
