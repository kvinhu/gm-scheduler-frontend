import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { LineOfService, ModifiedDay } from "../../shared/interfaces";
import { GetServicesService } from "../../services/get-services.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { modified_days } from "../../shared/tables";
import { MatDialog } from "@angular/material";
import { CreateHolidayDialogComponent } from "../create-holiday-dialog/create-holiday-dialog.component";
import * as moment from "moment";
import {
  updateHolidayValidationMsgs,
  timeValidator
} from "../../shared/validations";
import { customValidatorsForModified } from 'src/app/shared/helpers';
import { AlertDeleteComponent } from '../alert-delete/alert-delete.component';

@Component({
  selector: "app-modified",
  templateUrl: "./modified.component.html",
  styleUrls: ["./modified.component.scss", "../dashboard.component.scss"]
})
export class ModifiedComponent implements OnInit {
  md_edit: ModifiedDay;
  columns2 = modified_days;
  displayedColumns2: string[] = [
    ...this.columns2.map(c => c.columnDef),
    "actions",
    "delete"
  ];
  @Input() services: LineOfService[] = [];
  @Input() view: LineOfService;
  @Output() updateServices = new EventEmitter<LineOfService[]>();
  modifiedForm: FormGroup;
  formErrors = {
    date: "",
    startTime: "",
    endTime: "",
    allDay: ""
  };
  valid: boolean = true;

  constructor(
    public dialog: MatDialog,
    private los: GetServicesService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.modifiedForm = this.fb.group({
      name: ["", [Validators.required]],
      startTime: ["", [timeValidator]],
      endTime: ["", [timeValidator]],
      date: [{}, [Validators.required]],
      allDay: [false],
      id: "",
      lineOfServiceId: ""
    });
  }

  public clearEdit() {
    this.md_edit = null;
    this.formErrorsReset();
  }

  createModifiedForm(): void {
    let {
      name,
      startTime,
      endTime,
      date,
      allDay,
      id,
      lineOfServiceId
    } = this.md_edit;
    this.modifiedForm = this.fb.group({
      name: [name, [Validators.required]],
      startTime: [startTime, [timeValidator]],
      endTime: [endTime, [timeValidator]],
      date: [date, [Validators.required]],
      allDay: [allDay],
      id,
      lineOfServiceId
    });
    this.modifiedForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  public delete(row){
    console.log(row)
    const dialogRef = this.dialog.open(AlertDeleteComponent, {
      width: "400px",
      height: "300px",
      data : { modified: row }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      console.log(result);
      if (result) {
        this.los.deleteModifiedDay(result).subscribe((modified: ModifiedDay) => {
          this.los.getAll().subscribe((services: LineOfService[]) => {
            this.updateServices.emit(services);
            this.md_edit = null;
          });
        });
      }
    });
    // this.los.deleteModifiedDay(row).subscribe((modified: ModifiedDay) => {
    //   this.los.getAll().subscribe((services: LineOfService[]) => {
    //     this.updateServices.emit(services);
    //     this.md_edit = null;
    //   });
    // });
  }

  public formErrorsReset(){
    this.formErrors = {
      date: "",
      startTime: "",
      endTime: "",
      allDay: ""
    };
  }

  onValueChanged(data?: any): void {
    if (!this.modifiedForm) {
      return;
    }
    const form = this.modifiedForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = "";
        // console.log('just cleared ' + field)
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = updateHolidayValidationMsgs[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] = messages[key] + " ";
            }
          }
        } else if (control && control.valid) {
          let { startTime, endTime, allDay } = this.modifiedForm.value;
          this.formErrors = customValidatorsForModified(startTime, endTime, allDay, this.formErrors, field);
        }
      }
    }
    const { startTime, endTime, allDay, date } = this.formErrors;
    this.valid =
      !startTime &&
      !endTime &&
      (!allDay || allDay == "Start and/or End time will be nullified. ") &&
      !date;
      // console.log(this.formErrors)
  }

  public onSubmit(row): void {
    // console.log("ROW BEFORE SUBMIT: ", row.value)
    this.los.updateModifiedDay(row.value).subscribe((modified: ModifiedDay) => {
      this.los.getAll().subscribe((services: LineOfService[]) => {
        this.updateServices.emit(services);
        this.md_edit = null;
      });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateHolidayDialogComponent, {
      width: "600px",
      height: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      // console.log(result);
      if (result) {
        result = { ...result, lineOfServiceId: this.view.id };
        this.los.createModifiedDay(result).subscribe((created: ModifiedDay) => {
          this.los.getAll().subscribe((services: LineOfService[]) => {
            this.updateServices.emit(services);
          });
        });
      }
    });
  }

  public toggle(row): void {
    this.md_edit = row;
    this.createModifiedForm();
  }
}
