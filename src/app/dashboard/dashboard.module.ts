import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModifiedComponent } from "./modified/modified.component";
import { StandardComponent } from "./standard/standard.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { RouterModule } from "@angular/router";
import { dashboardRoutes } from "./dashboard.routes";
import { DashboardComponent } from "./dashboard.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import {
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatDialogRef,
  MatIconModule,
  MatProgressSpinnerModule
} from "@angular/material";
import { TextFieldModule } from '@angular/cdk/text-field';
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { CreateLineofServiceDialogComponent } from './create-lineofservice-dialog/create-lineofservice-dialog.component';
import { CreateHolidayDialogComponent } from './create-holiday-dialog/create-holiday-dialog.component';
import { AlertDeleteComponent } from './alert-delete/alert-delete.component';

@NgModule({
  declarations: [
    ModifiedComponent,
    StandardComponent,
    ToolbarComponent,
    DashboardComponent,
    CreateLineofServiceDialogComponent,
    CreateHolidayDialogComponent,
    AlertDeleteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatDialogModule,
    TextFieldModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  entryComponents: [
    CreateLineofServiceDialogComponent,
    CreateHolidayDialogComponent,
    AlertDeleteComponent
  ],
})
export class DashboardModule {}
