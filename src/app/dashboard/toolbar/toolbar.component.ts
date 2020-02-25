import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { GetServicesService } from "../../services/get-services.service";
import { LineOfService } from "src/app/shared/interfaces";
import { CreateLineofServiceDialogComponent } from "../create-lineofservice-dialog/create-lineofservice-dialog.component";
import { AlertDeleteComponent } from '../alert-delete/alert-delete.component';
import { LoginService } from "src/app/services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss", "../dashboard.component.scss"]
})
export class ToolbarComponent implements OnInit {
  @Output() updateServices = new EventEmitter<LineOfService[]>();
  @Output() newView = new EventEmitter<LineOfService>();
  @Input() view: LineOfService;

  constructor(
    public dialog: MatDialog,
    private los: GetServicesService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {}

  alertDelete() {
    const dialogRef = this.dialog.open(AlertDeleteComponent, {
      width: "400px",
      height: "300px",
      data : { view: this.view }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      console.log(result);
      if (result) {
        console.log("hit result")
        this.los.deleteService(result).subscribe((message: any) => {
          console.log(message);
          this.los.getAll().subscribe((services: LineOfService[]) => {
            let view = services[0];
            this.updateServices.emit(services);
            this.newView.emit(view);
          });
        });
      }
    });
  }

  logout() {
    this.loginService.logout().subscribe(() => {
      localStorage.setItem("bearer", "")
      this.router.navigate(["/login"]);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateLineofServiceDialogComponent, {
      width: "600px",
      height: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      console.log(result);
      if (result) {
        this.los.createService(result).subscribe((created: LineOfService) => {
          console.log(created);
          this.los.getAll().subscribe((services: LineOfService[]) => {
            let view = services.find(s => s.name == result.name);
            this.updateServices.emit(services);
            this.newView.emit(view);
          });
        });
      }
    });
  }
}
