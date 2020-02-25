import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { LineOfService, StandardDay } from "../../shared/interfaces";
import { GetServicesService } from "../../services/get-services.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { standard_days } from "../../shared/tables";
import {
  timeValidator,
  updateWeekdayValidationMsgs
} from "../../shared/validations";
import * as moment from "moment";
import { customValidatorsForStandard } from 'src/app/shared/helpers';

@Component({
  selector: "app-standard",
  templateUrl: "./standard.component.html",
  styleUrls: ["./standard.component.scss", "../dashboard.component.scss"]
})
export class StandardComponent implements OnInit {
  sd_edit: StandardDay;
  columns1 = standard_days;
  displayedColumns: string[] = [
    ...this.columns1.map(c => c.columnDef),
    "actions"
  ];
  @Input() services: LineOfService[] = [];
  @Input() view: LineOfService;
  @Output() updateServices = new EventEmitter<LineOfService[]>();
  standardForm: FormGroup;
  formErrors = {
    startTime: "",
    endTime: ""
  };
  valid: boolean = true;

  constructor(private los: GetServicesService, private fb: FormBuilder) {}

  ngOnInit() {
    this.standardForm = this.fb.group({
      name: "",
      startTime: "",
      endTime: "",
      id: "",
      lineOfServiceId: "",
      order: 0
    });
  }

  public clearEdit() {
    this.sd_edit = null;
  }

  createStandardForm(): void {
    const {
      name,
      startTime,
      endTime,
      order,
      id,
      lineOfServiceId
    } = this.sd_edit;
    this.standardForm = this.fb.group({
      name: [name, [Validators.required]],
      startTime: [startTime, [timeValidator]],
      endTime: [endTime, [timeValidator]],
      id,
      lineOfServiceId,
      order
    });
    this.standardForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any): void {
    if (!this.standardForm) {
      return;
    }
    const form = this.standardForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = "";
        // console.log('just cleared ' + field)
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = updateWeekdayValidationMsgs[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] = messages[key] + " ";
            }
          }
        } else if (control && control.valid) {
          let { startTime, endTime } = this.standardForm.value;
          this.formErrors = customValidatorsForStandard(startTime, endTime, this.formErrors, field);
        }
      }
    }
    const { startTime, endTime } = this.formErrors;
    this.valid = !startTime && !endTime;
    // console.log(this.formErrors)
  }

  public onSubmit(row): void {
    // console.log("STANDARD ROW BEFORE SUBMIT: ", row.value)
    this.los.updateStandardDay(row.value).subscribe((standard: StandardDay) => {
      this.los.getAll().subscribe((services: LineOfService[]) => {
        this.updateServices.emit(services);
        this.sd_edit = null;
      });
    });
  }

  public toggle(row): void {
    this.sd_edit = row;
    this.createStandardForm();
  }
}
