import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-simple-component',
  templateUrl: './dialog-simple.component.html',
  styleUrls: ['./dialog-simple.component.css'],
})
export class DialogSimpleComponent implements OnInit {

  private dialogTitle: string;

  private values: any[];
  private submitButtonCaption: String;
  private abortButtonCaption: String;
  private displayFunction: (x: any) => String;

  constructor(
    private dialogRef: MatDialogRef<DialogSimpleComponent>,
    @Inject(MAT_DIALOG_DATA) {
      dialogTitle,
      submitButtonCaption,
      abortButtonCaption,
      values,
      displayFunction
    }) {
    this.dialogTitle = dialogTitle;
    this.submitButtonCaption = submitButtonCaption;
    this.abortButtonCaption = abortButtonCaption;
    this.values = values;
    this.displayFunction = displayFunction;
  }

  ngOnInit() {

  }

  submit() {
    this.dialogRef.close(this.values);
  }

  abort($event: any) {
    this.dialogRef.close(null);
  }

  getDisplayValue(value: any) {
    if (this.displayFunction) {
      return this.displayFunction(value);
    } else {
      return value;
    }
  }
}
