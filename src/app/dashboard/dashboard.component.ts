import { Component, OnInit } from "@angular/core";
import { LineOfService } from "../shared/interfaces";
import { GetServicesService } from "../services/get-services.service";
import { timesTo_hhmmss } from "../shared/helpers";
import { LoginService } from "../services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  services: LineOfService[] = [];
  view: LineOfService;
  loggedIn: boolean = false;

  constructor(
    private los: GetServicesService,
    private login: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.localStorageGetItem("bearer").then(bearer => {
      if (!bearer) {
        this.router.navigate(["login"]);
      } else {
        console.log(bearer)
        this.login.getToken(bearer).subscribe(
          (message: any) => {
            console.log("Success from get token route:", message);
            this.loggedIn = true;
            this.los.getAll().subscribe((services: LineOfService[]) => {
              this.services = services.map(service => timesTo_hhmmss(service));
              this.view = services[0];
            });
          },
          err => {
            console.log("Error from get token route:", err);
            //localStorage.setItem("bearer", "");
            //this.router.navigate(['login'])
          }
        );
      }
    });
  }

  localStorageGetItem(key: string) {
    return Promise.resolve().then(() => {
      return localStorage.getItem(key);
    });
  }

  public onChange(event): void {
    this.services.forEach(service => {
      if (service.id == event.target.value) {
        console.log(event.target.value);
        this.view = timesTo_hhmmss(service);
      }
    });
  }

  changeViewToCreated($event) {
    this.view = $event;
  }

  receiveMessage($event) {
    this.services = $event.map(service => timesTo_hhmmss(service));
    this.view = $event.find(x => x.id == this.view.id);
  }
}
