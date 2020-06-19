import {Component, OnInit, ViewChild} from '@angular/core';
import {ColumnDefinition} from '../unified-table/ColumnDefinition';
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
import {TranslationService} from '../translation.service';


@Component({
  selector: 'app-solvers',
  templateUrl: './solvers.component.html',
  providers: [SolversService, UnifiedTableComponent, TranslationService],
  styleUrls: ['./solvers.component.css']
})
export class SolversComponent implements OnInit {
  solversDescription: string;

  constructor(private solversService: SolversService, private dialog: MatDialog, private translationService: TranslationService) {
  }

  @ViewChild(UnifiedTableComponent) table: UnifiedTableComponent<Solver>;
  columns = [
    new ColumnDefinition('name', 'Name', (solver: Solver) => solver.name),
    new ColumnDefinition('active', 'Active', (solver: Solver) => solver.active),
    new ColumnDefinition('updateTimestamp', 'LastUpdated', (solver: Solver) => solver.updateTimestamp)
  ];

  dataSource: Collections.Set<Solver>;
  optionSizes: number[] = [5, 10, 15, 20];
  newOrUpdatedObjects: Collections.Set<Solver>;
  deletedItems: Collections.Set<Solver>;


  private static putSingleObjectIntoCollection(solver, dataCollection: Collections.Set<Solver>) {
    if (solver != null) {
      const solverWithType = Object.assign(new Solver(), solver);
      dataCollection.add(solverWithType);
    }
  }

  async ngOnInit() {
    this.getSolvers();
    await this.translationService.loadTranslations();
    this.solversDescription = this.translationService.getTranslation('solvers.description');
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

  addDeleteSolver() {
    this.openDeleteSolverDialog();
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
          const solverWithType = Object.assign(new Solver(), solver);
          const result: Observable<Solver[]> = this.solversService.addNewSolver(solverWithType);
          result.subscribe(slvr => {
            // making an new instance triggers the change event on the unified table
            this.newOrUpdatedObjects = new Collections.Set<Solver>();
            SolversComponent.putSingleObjectIntoCollection(slvr, this.newOrUpdatedObjects);
          });
        }
      }
    );
  }

  private openDeleteSolverDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const displayFunction: (s: Solver) => String = solver => solver.name;
    dialogConfig.data = {
      dialogTitle: 'Delete selected Solvers',
      submitButtonCaption: 'Delete',
      abortButtonCaption: 'Cancel',
      values: this.table.selection.selected,
      displayFunction: displayFunction
    };

    const dialogRef = this.dialog.open(DialogSimpleComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      solvers => {
        if (solvers != null) {
          // making an new instance triggers the change event on the unified table
          solvers.forEach(solver => {
            const result = this.solversService.deleteSolver(solver);
            result.subscribe(slvr => {
              // making an new instance triggers the change event on the unified table
              this.deletedItems = new Collections.Set<Solver>();
              this.deletedItems.add(slvr);
              this.table.selection.deselect(slvr);
            });
          });
        }
      }
    );
  }
}
