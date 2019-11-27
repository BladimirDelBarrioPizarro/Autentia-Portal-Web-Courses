import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';



  export interface DialogData {
    animal: 'panda' | 'unicorn' | 'lion';
  }

  @Component({
    templateUrl: 'dialog.component.html',
    styleUrls: ['./dialog.component.css']
})

  export class DialogDataExampleDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  }

