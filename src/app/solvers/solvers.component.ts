import {Component, OnInit} from '@angular/core';
import {ColumnDefinition} from "../unified-table/ColumnDefenition";
import {UnifiedTableComponent} from "../unified-table/unified-table.component";
import {SolversService} from "./solvers.service";
import * as Collections from "typescript-collections";
import {Solver} from "./Solver";

@Component({
  selector: 'app-solvers',
  templateUrl: './solvers.component.html',
  providers: [SolversService, UnifiedTableComponent],
  styleUrls: ['./solvers.component.css']
})
export class SolversComponent implements OnInit {

  columns = [
    new ColumnDefinition("name", "Name", (solver: Solver) => solver.name),
    new ColumnDefinition("updateTimestamp", "LastUpdated", (solver: Solver) => solver.updateTimestamp)
  ];

  private dataSource: Collections.Set<Solver>;
  private optionSizes: number[] = [5, 10, 15, 20];
  private addedObject: Collections.Set<Solver>;

  constructor(private solversService: SolversService) {
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
        let solverWithType = Object.assign(new Solver(), solver);
        return dataCollection.add(solverWithType);
      });
    }
  }

  addNewSolver() {
    const solver: Solver =
      {
        name: 'get groceries',
        oid: 'eggs, milk, etc.',
        updateTimestamp: new Date()
      };
    this.addedObject = new Collections.Set<Solver>();
    this.addedObject.add(solver);
  }
}
