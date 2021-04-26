import { Component, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.component.html',
  styleUrls: ['./dialog-content-example-dialog.component.css']
})
export class DialogContentExampleDialogComponent {

  constructor(private _dialogRef: MatDialogRef<DialogContentExampleDialogComponent>) { }
  @HostListener('window:keyup.esc') onKeyUp() {
    this._dialogRef.close();
  }

  

}
