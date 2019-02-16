import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  form: FormGroup;
  dialogTitle: string;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) {
                dialogTitle
              }) {

    this.dialogTitle = dialogTitle;

    this.form = fb.group({
      name: ["", Validators.required],
      active: [""],
    });

  }

  ngOnInit() {

  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
