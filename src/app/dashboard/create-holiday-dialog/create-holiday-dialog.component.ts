import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material";
import {
  createHolidayValidationMsgs,
  timeValidator
} from "src/app/shared/validations";
import * as moment from "moment";
import { customValidatorsForModified } from "src/app/shared/helpers";

@Component({
  selector: "app-create-holiday-dialog",
  templateUrl: "./create-holiday-dialog.component.html",
  styleUrls: [
    "./create-holiday-dialog.component.scss",
    "../dashboard.component.scss"
  ]
})
export class CreateHolidayDialogComponent implements OnInit {
  m_fields = ["name", "startTime", "endTime", "date", "allDay"];
  newModifiedForm: FormGroup;
  formErrors = {
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    allDay: ""
  };
  valid: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<CreateHolidayDialogComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createLosForm();
  }

  createLosForm() {
    this.newModifiedForm = this.fb.group({
      name: ["", Validators.required],
      startTime: ["", [timeValidator]],
      endTime: ["", [timeValidator]],
      date: [{}, [Validators.required]],
      allDay: [true]
    });

    this.newModifiedForm.valueChanges.subscribe(data =>
      this.onValueChanged(data)
    );
  }

  onValueChanged(data?: any): void {
    if (!this.newModifiedForm) {
      return;
    }
    const form = this.newModifiedForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = "";
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = createHolidayValidationMsgs[field];

          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] = messages[key] + " ";
            }
          }
        } else if (control && control.valid) {
          let { startTime, endTime, allDay } = this.newModifiedForm.value;
          this.formErrors = customValidatorsForModified(
            startTime,
            endTime,
            allDay,
            this.formErrors,
            field
          );
        }
      }
    }
    const { name, startTime, endTime, allDay, date } = this.formErrors;
    this.valid =
      !name &&
      !startTime &&
      !endTime &&
      (!allDay || allDay == "Start and/or End time will be nullified. ") &&
      !date;
  }

}
