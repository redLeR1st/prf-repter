import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-sb-container',
  templateUrl: './sb-container.component.html',
  styleUrls: ['./sb-container.component.scss']
})
export class SbContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


@Component({
  selector: 'snack-bar-component-example-snack-sucsess',
  templateUrl: 'snack-bar-component-example-snack-succ.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
    p {
      text-align: center;
    }
  `],
})
export class PizzaPartyComponent_sucsess {}

@Component({
  selector: 'snack-bar-component-example-snack-failed',
  templateUrl: 'snack-bar-component-example-snack-fail.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
    p {
      text-align: center;
    }
  `],
})
export class PizzaPartyComponent_failed {}

@Component({
  selector: 'Logout_success',
  templateUrl: 'Logout_success.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
    p {
      text-align: center;
    }
  `],
})
export class Logout_success {}

@Component({
  selector: 'Signup_success',
  templateUrl: 'Signup_success.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
    p {
      text-align: center;
    }
  `],
})
export class Signup_success {}

@Component({
  selector: 'Signup_error',
  templateUrl: 'Signup_error.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
    p {
      text-align: center;
    }
  `],
})
export class Signup_error {}

export interface DialogData {
  name: string;
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {constructor(
  public dialogRef: MatDialogRef<DialogContentExampleDialog>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

onNoClick(): void {
  this.dialogRef.close();
}}

@Component({
  selector: 'Delete_yourselfe',
  templateUrl: 'Delete_yourselfe.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
    p {
      text-align: center;
    }
  `],
})
export class Delete_yourselfe {}

@Component({
  selector: 'Hotel_added',
  templateUrl: 'Hotel_added.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
    p {
      text-align: center;
    }
  `],
})
export class Hotel_added {}

@Component({
  selector: 'Hotel_reserved',
  templateUrl: 'Hotel_reserved.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
    p {
      text-align: center;
    }
  `],
})
export class Hotel_reserved {}

@Component({
  selector: 'Hotel_delete',
  templateUrl: 'Hotel_delete.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
    p {
      text-align: center;
    }
  `],
})
export class Hotel_delete {}