import { Component, OnInit, Inject, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "../services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  @Input()
  ngClass: any;
  loginForm: FormGroup;
  disabled: boolean = true;
  validationErrorLogin: boolean = false;
  loginValidationMsg: string;

  formErrors = {
    account: "",
    // username: "",
    // password: "",
    invalid: ""
  };

  validationMessages = {
    account: {
      required: "Account Number is required",
      minlength: "Account number must be at least 7 characters"
    }
    // username: {
    //   required: "Username is required"
    // },
    // password: {
    //   required: "Password is required"
    // }
  };

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
    this.onValueChanged();
  }

  createForm() {
    this.loginForm = this.fb.group({
      account: ["", [Validators.required, Validators.minLength(7)]]
      // username: ["", [Validators.required]],
      // password: ["", [Validators.required]]
    });

    this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any): void {
    if (!this.loginForm) {
      return;
    }

    const form = this.loginForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = "";
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + " ";
            }
          }
        }
      }
    }
    this.disabled = this.loginForm.invalid;
    if (data == "invalid") {
      this.validationErrorLogin = true;
      this.formErrors.invalid = "Credentials are Invalid!";
      return;
    }
  }

  onSubmit() {
    window.open('/api/auth/login',"mywindow","location=1,status=1,scrollbars=1, width=800,height=800");
    let listener = window.addEventListener('message', (message) => {
      //message will contain facebook user and details
      console.log(message)
      localStorage.setItem("bearer", message.data.user);
      this.router.navigate(["/dashboard"])
    });    
  }
}
