import {DataObjectClass} from "../dataobject/DataObjectClass";

export class Issue extends DataObjectClass{
  name: string;
  description: string;
  solutionDescription: string;
  deviceOID: string;
  stateOID: string;
  solverOID: string;
}
