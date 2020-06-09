export class ColumnDefinition<T> {
  columnID: String;
  header: String;
  cellValue: (data: T) => any;

  constructor(columnId: String, header: String, cellValue: (data: T) => any) {
    this.columnID = columnId;
    this.header = header;
    this.cellValue = cellValue;
  }
}
