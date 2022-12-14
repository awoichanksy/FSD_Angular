import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {ControlBase} from './databound-field';

@Injectable()
export class DataControlService {
  constructor() {
  }

  toFormGroup(controls: ControlBase<any>[]) {
    const group: any = {};

    controls.forEach(control => {
      group[control.key] = control.required ?
        new FormControl(control.value || '', Validators.required)
        : new FormControl(control.value || '');
    });
    return new FormGroup(group);
  }
}
