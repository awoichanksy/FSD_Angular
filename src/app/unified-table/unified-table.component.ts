import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from "@angular/material";
import {ColumnDefinition} from "./ColumnDefenition";


@Component({
  selector: 'app-unified-table',
  templateUrl: './unified-table.component.html',
  styleUrls: ['./unified-table.component.css']
})

export class UnifiedTableComponent implements OnChanges {
  @Input() columns: ColumnDefinition<any>[];
  @Input() dataSource: any;
  @Input() optionSizes: number[] = [5, 10, 20];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: any[];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataSource.currentValue != null) {
      changes.dataSource.currentValue.paginator = this.paginator;
      changes.dataSource.currentValue.sort = this.sort;
      this.displayedColumns = this.columns.map(c => c.columnID);
    }
  }
}
