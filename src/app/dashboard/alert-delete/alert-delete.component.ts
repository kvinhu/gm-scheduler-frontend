import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LineOfService } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-alert-delete',
  templateUrl: './alert-delete.component.html',
  styleUrls: ['./alert-delete.component.scss']
})
export class AlertDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AlertDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LineOfService) { }

  ngOnInit() {
  }

}
