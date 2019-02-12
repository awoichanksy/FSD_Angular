import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {ColumnDefinition} from "./ColumnDefenition";
import {MatSortable} from "@angular/material/typings/sort";
import * as Collections from "typescript-collections";
import {DataObjectClass} from "../dataobject/DataObjectClass";
import {animate, sequence, style, transition, trigger,} from '@angular/animations';


const rowsAnimation =
  trigger('rowsAnimation', [
    transition('void => *', [
      style({
        opacity: 0.5,
        backgroundColor: 'green'
      }),
      sequence([
        animate("1s ease", style({
          opacity: 1,
          backgroundColor: '*'
        })),
      ])
    ])
  ]);


@Component({
  selector: 'app-unified-table',
  templateUrl: './unified-table.component.html',
  styleUrls: ['./unified-table.component.css'],
  animations: [rowsAnimation]
})

export class UnifiedTableComponent implements OnInit, OnChanges {

  @Input() columns: ColumnDefinition<any>[];
  @Input() dataArray: Collections.Set<DataObjectClass>;
  @Input() newOrUpdatedItems: Collections.Set<DataObjectClass>;
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
    this.sort.sort(<MatSortable>({id: 'updateTimestamp', start: 'desc'}));

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataArray != null && changes.dataArray.currentValue != null) {
      this.dataArray = changes.dataArray.currentValue;
      this.dataSource.data = this.dataArray.toArray();
    }
    if (changes.newOrUpdatedItems != null && changes.newOrUpdatedItems.currentValue != null) {
      this.newOrUpdatedItems = changes.newOrUpdatedItems.currentValue;
      this.dataArray.difference(this.newOrUpdatedItems);
      this.dataArray.union(this.newOrUpdatedItems);
      this.dataSource.data = this.dataArray.toArray();
      this.dataSource.filter = '';

      if (this.newOrUpdatedItems.size() > 0) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }
}
