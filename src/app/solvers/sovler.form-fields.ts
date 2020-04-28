import {ControlBase} from '../unified-form/databound-field';
import {TextBoxBound} from '../unified-form/databound-textfield';
import {DataboundCheckbox} from '../unified-form/databound-checkbox';


export class SolverFormFields {
  static getSolverFormFields(): ControlBase<any> [] {

    const fields: ControlBase<any>[] = [new TextBoxBound
    ({
      key: 'name',
      label: 'Solver Name',
      value: '',
      required: true,
      order: 1,
    }),
      new DataboundCheckbox({
        key: 'active',
        label: 'Activate Solver',
        value: false,
        type: 'boolean',
        order: 2
      })
    ];
    return fields;
  }
}
