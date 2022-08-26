import {DataObjectClass} from '../dataobject/DataObjectClass';

export class Device extends DataObjectClass {
  oid: string;
  name: string;
  description: string;
  location: string;
}
