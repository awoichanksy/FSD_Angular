import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {DataControlService} from './data-control.service';
import {ControlBase} from './databound-field';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [DataControlService]
})
export class DynamicFormComponent implements OnInit {

  @Input() formFields: ControlBase<any>[] = [];
  @Input() abortButtonCaption: String;
  form: FormGroup;
  @Output() valueChange = new EventEmitter();
  @Output() abortEvent = new EventEmitter();

  constructor(private dataControlService: DataControlService) {
  }

  ngOnInit() {
    this.form = this.dataControlService.toFormGroup(this.formFields);
  }

  onSubmit() {
    this.valueChange.emit(this.form.value);
  }

  abort() {
    this.abortEvent.emit(null);
  }
}
