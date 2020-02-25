import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { createLosValidationMsgs, phoneNumberValidator } from '../../shared/validations';

@Component({
  selector: "app-create-lineofservice-dialog",
  templateUrl: "./create-lineofservice-dialog.component.html",
  styleUrls: ["./create-lineofservice-dialog.component.scss", "../dashboard.component.scss"]
})
export class CreateLineofServiceDialogComponent implements OnInit {
  los = ['name', 'description', 'location', 'phone']
  losForm: FormGroup;
  formErrors = {
    'name': '',
    'location': '',
    'phone': '',
  };

  constructor(public dialogRef: MatDialogRef<CreateLineofServiceDialogComponent>, private fb: FormBuilder) {}

  ngOnInit() {
    this.createLosForm();
  }

  createLosForm() {
    this.losForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      location: ['', [Validators.required]],
      phone: ['', [Validators.minLength(10), phoneNumberValidator]]
    })

    this.losForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any): void {
    if (!this.losForm) { return; }
    const form = this.losForm;
    for(const field in this.formErrors) {
      if(this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid) {
          const messages = createLosValidationMsgs[field];
          for (const key in control.errors) {
            if(control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
