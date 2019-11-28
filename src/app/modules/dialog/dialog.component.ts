import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ajax } from 'rxjs/ajax';
import {MatSnackBar} from '@angular/material/snack-bar';

  export interface Professor {
    id:'',
    name:''
  }

  @Component({
    templateUrl: 'dialog.component.html',
    styleUrls: ['./dialog.component.css']
})

  export class DialogDataExampleDialog {
    apiData;
    professors;
    formData: string[] = [];
    constructor(@Inject(MAT_DIALOG_DATA) public data: Professor,private _snackBar: MatSnackBar) {}

    ngOnInit() {
      const url = `http://localhost:8083/api/v1/professors`;
      this.apiData = ajax(url);
      this.apiData.subscribe(res => {
        this.professors = res.response;
      });
    }

    getActive($e){
      this.formData = [];
      this.formData.push($e.target.checked)
    }
    getProfessor($e){
      this.formData.push($e.target.value)
    }
    getTitle($e){
      this.formData.push($e.target.value)
    }
    getLevel($e){
      this.formData.push($e.target.value)
    }
    getHours($e){
      this.formData.push($e.target.value)
    }


    insertCourse($e){
      console.log(this.formData)
      $e.preventDefault();
       let json = {
        "title": this.formData[3],
        "professor": this.formData[2],
        "level": this.formData[4],
        "hours": this.formData[5],
        "active": this.formData[0]
      } 
    console.log(json)
      const url = `http://localhost:8083/api/v1/course`;
    }

 

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 2000,
      });
    }

  }

