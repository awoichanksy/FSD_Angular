import {ControlBase} from '../unified-form/databound-field';
import {TextBoxBound} from '../unified-form/databound-textfield';


export class DeviceFormFields {
  static getDeviceFormFields(): ControlBase<any> [] {

    const fields: ControlBase<any>[] = [new TextBoxBound
    ({
      key: 'name',
      label: 'Device Name',
      value: '',
      required: true,
      type: 'text',
      order: 1,
    }),
      new TextBoxBound({
        key: 'description',
        label: 'Device Description',
        value: '',
        required: true,
        type: 'text',
        order: 2
      }),
      new TextBoxBound({
        key: 'location',
        label: 'Device Location',
        value: '',
        required: true,
        type: 'text',
        order: 3
      })
    ];
    return fields;
  }
}
