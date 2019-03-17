import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder} from "@angular/forms";
import {DataControlService} from "../unified-form/data-control.service";
import {ControlBase} from "../unified-form/databound-field";

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [DataControlService]
})
export class DialogComponent implements OnInit {

  dialogTitle: string;

  formFields: ControlBase<any>[];

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) {
                dialogTitle,
                fields
              }) {
    this.dialogTitle = dialogTitle;
    this.formFields = fields;
  }

  ngOnInit() {

  }

  save(event: any) {
    this.dialogRef.close(event);
  }

  cancel($event: any) {
    this.dialogRef.close(null);
  }
}
