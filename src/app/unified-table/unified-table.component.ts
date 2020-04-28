import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ColumnDefinition} from './ColumnDefenition';
import {MatSortable} from '@angular/material/typings/sort';
import {SelectionModel} from '@angular/cdk/collections';
import * as Collections from 'typescript-collections';
import {DataObjectClass} from '../dataobject/DataObjectClass';
import {animate, sequence, style, transition, trigger} from '@angular/animations';


const rowsAnimation =
  trigger('rowsAnimation', [
    transition('void => *', [
      style({
        opacity: 0.5,
        backgroundColor: 'green'
      }),
      sequence([
        animate('1s ease', style({
          opacity: 1,
          backgroundColor: '*'
        })),
      ])
    ])
  ]);


const selectorColumn = 'selectorColumn';

@Component({
  selector: 'app-unified-table',
  templateUrl: './unified-table.component.html',
  styleUrls: ['./unified-table.component.css'],
  animations: [rowsAnimation],
  exportAs: 'unifiedTable'
})

export class UnifiedTableComponent<T extends DataObjectClass> implements OnInit, OnChanges {

  @Input() columns: ColumnDefinition<any>[];
  @Input() selection: SelectionModel<T>;
  @Input() dataArray: Collections.Set<T>;
  @Input() newOrUpdatedItems: Collections.Set<T>;
  @Input() deletedItems: Collections.Set<T>;
  @Input() optionSizes: number[] = [5, 10, 20];
  private dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: any[];

  get selectedItems(): SelectionModel<T> {
    return this.selection;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.columns.push(new ColumnDefinition(selectorColumn, '-', (row: T) => row.oid));
    this.displayedColumns = this.columns
      .sort(this.selectorColumnFirst())
      .map(c => c.columnID);
    this.sort.sort(<MatSortable>({id: 'updateTimestamp', start: 'desc'}));

    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<T>(allowMultiSelect, initialSelection);
  }

  private selectorColumnFirst() {
    return (a, b) => {
      if (a.columnID === selectorColumn) {
        return -1;
      } else {
        return 0;
      }
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.deletedItems != null && changes.deletedItems.currentValue != null) {
      this.deletedItems = changes.deletedItems.currentValue;
      this.dataArray.difference(this.deletedItems);
      this.dataSource.data = this.dataArray.toArray();
      this.dataSource.filter = '';
    }
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

      if (this.dataArray.size() > 0) {
        this.dataSource.paginator = this.paginator;
        this.selection.clear();
      }
    }
  }
}
