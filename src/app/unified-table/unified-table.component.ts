import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {ColumnDefinition} from "./ColumnDefenition";


@Component({
  selector: 'app-unified-table',
  templateUrl: './unified-table.component.html',
  styleUrls: ['./unified-table.component.css']
})

export class UnifiedTableComponent implements OnInit, OnChanges {

  @Input() columns: ColumnDefinition<any>[];
  @Input() dataArray: any;
  @Input() optionSizes: number[] = [5, 10, 20];
  private dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: any[];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.displayedColumns = this.columns.map(c => c.columnID);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataArray.currentValue != null) {
      this.dataSource.data = changes.dataArray.currentValue;

    }
  }
}
