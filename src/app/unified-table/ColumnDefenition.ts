export class ColumnDefinition<T> {
  columnID: String;
  header: String;
  cellValue: (data: T) => string;

  constructor(columnId: String, header: String, cellValue: (data: T) => string) {
    this.columnID = columnId;
    this.header = header;
    this.cellValue = cellValue;
  }
}
