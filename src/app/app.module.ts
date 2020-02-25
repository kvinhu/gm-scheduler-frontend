import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from "@angular/common/http";
import { DashboardModule } from './dashboard/dashboard.module';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
// import { OAuthModule } from 'angular-oauth2-oidc';

import { LoginService } from "./services/login.service";
import { ProcessHttpmsgService } from "./services/process-httpmsg.service";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    DashboardModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    // OAuthModule.forRoot()
  ],
  providers: [LoginService, ProcessHttpmsgService],
  bootstrap: [AppComponent]
})
export class AppModule {}
