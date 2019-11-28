import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ajax } from 'rxjs/ajax';
import {MatSnackBar} from '@angular/material/snack-bar';

  export interface Professor {
    id:'',
    name:''
  }


// Declarar variable global course
// En los gets ir seteandola con los parámetros


  @Component({
    templateUrl: 'dialog.component.html',
    styleUrls: ['./dialog.component.css']
})

  export class DialogDataExampleDialog {
    apiData;
    professors;
    active:boolean;
    constructor(@Inject(MAT_DIALOG_DATA) public data: Professor,private _snackBar: MatSnackBar) {}

    ngOnInit() {
      const url = `http://localhost:8083/api/v1/professors`;
      this.apiData = ajax(url);
      this.apiData.subscribe(res => {
        console.log(res.status, res.response)
        this.professors = res.response;
      });
    }

    getActive($e){
      const active = $e.target.checked;
      console.log(active)
      this.active = $e.target.checked;
    }

    getProfessor($e){
      const id = $e.target.value;
      console.log(id)
      return id;
    }


    getTitle($e){
      const title = $e.target.value;
      console.log(title);
    }

    getLevel($e){
      const level = $e.target.value;
      console.log(level);
    }

    insertCourse($e){
      $e.preventDefault();
      const url = `http://localhost:8083/api/v1/course`;
      const active = this.getActive;
      const idProfessor = this.getProfessor;
      console.log(idProfessor);
      console.log(active)
      console.log(this.professors);
      /* const name = Object.keys(this.professors).map(item => item. == idProfessor);
      console.log(name) */
    }

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 2000,
      });
    }

  }

