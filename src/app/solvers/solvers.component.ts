import {Component, OnInit, ViewChild} from '@angular/core';
import {ColumnDefinition} from '../unified-table/ColumnDefenition';
import {UnifiedTableComponent} from '../unified-table/unified-table.component';
import {SolversService} from './solvers.service';
import * as Collections from 'typescript-collections';
import {Solver} from './Solver';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import {Observable} from 'rxjs';
import {ControlBase} from '../unified-form/databound-field';
import {SolverFormFields} from './sovler.form-fields';
import {DialogSimpleComponent} from '../dialog-simple/dialog-simple.component';


@Component({
  selector: 'app-solvers',
  templateUrl: './solvers.component.html',
  providers: [SolversService, UnifiedTableComponent],
  styleUrls: ['./solvers.component.css']
})
export class SolversComponent implements OnInit {

  constructor(private solversService: SolversService, private dialog: MatDialog) {
  }

  @ViewChild(UnifiedTableComponent) table: UnifiedTableComponent<Solver>;
  columns = [
    new ColumnDefinition('name', 'Name', (solver: Solver) => solver.name),
    new ColumnDefinition('active', 'Active', (solver: Solver) => solver.active),
    new ColumnDefinition('updateTimestamp', 'LastUpdated', (solver: Solver) => solver.updateTimestamp)
  ];

  private dataSource: Collections.Set<Solver>;
  private optionSizes: number[] = [5, 10, 15, 20];
  private newOrUpdatedObjects: Collections.Set<Solver>;
  private deletedItems: Collections.Set<Solver>;


  private static putSingleObjectIntoCollection(solver, dataCollection: Collections.Set<Solver>) {
    if (solver != null) {
      const solverWithType = Object.assign(new Solver(), solver);
      dataCollection.add(solverWithType);
    }
  }

  ngOnInit() {
    this.getSolvers();
  }

  getSolvers(): void {
    this.solversService.getSolvers()
      .subscribe(solverArray => this.assignDataToDataSource(solverArray));
  }

  private assignDataToDataSource(solversArray: Solver[]) {
    this.dataSource = new Collections.Set<Solver>();
    this.putDataIntoCollection(solversArray, this.dataSource);
  }

  private putDataIntoCollection(solversArray: Solver[], dataCollection: Collections.Set<Solver>) {
    if (solversArray != null && solversArray.length > 0) {
      solversArray.forEach(solver => {
        const solverWithType = Object.assign(new Solver(), solver);
        return dataCollection.add(solverWithType);
      });
    }
  }

  getHasTableSelectedItems(): boolean {
    return this.table.selection.isEmpty();
  }

  addNewSolver() {
    this.openAddNewSolverDialog();
  }


  openAddNewSolverDialog() {
    const fields: ControlBase<any>[] = SolverFormFields.getSolverFormFields();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      dialogTitle: 'Add new Solver',
      fields: fields
    };

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      solver => {
        if (solver != null) {
          let solverWithType = Object.assign(new Solver(), solver);
          let result: Observable<Solver[]> = this.solversService.addNewSolver(solverWithType);
          result.subscribe(solver => {
            this.newOrUpdatedObjects = new Collections.Set<Solver>();
            SolversComponent.putSingleObjectIntoCollection(solver, this.newOrUpdatedObjects);
          });
        }
      }
    )
  }
}
