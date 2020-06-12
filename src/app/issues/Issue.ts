import {DataObjectClass} from '../dataobject/DataObjectClass';
import {Device} from '../devices/Device';
import {Solver} from '../solvers/Solver';
import {IssueState} from './IssueState';

export class Issue extends DataObjectClass {
  name: string;
  description: string;
  solutionDescription: string;

  device: Device;
  issueState: IssueState;
  solver: Solver;

}
