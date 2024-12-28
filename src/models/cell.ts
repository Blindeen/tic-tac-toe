enum CellStatus {
  Empty,
  Circle,
  Cross,
}

class Cell {
  private id: number;
  private status: CellStatus;

  constructor(id: number) {
    this.id = id;
    this.status = CellStatus.Empty;
  }
}

export { Cell };
