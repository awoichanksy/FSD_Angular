import {ControlBase} from "./databound-field";

export class DataboundCheckbox extends ControlBase<boolean> {
  controlType = 'checkbox';
  options: { key: string, value: string }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
