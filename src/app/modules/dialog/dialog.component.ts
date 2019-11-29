import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import {FormBuilder,FormGroup,FormControl} from '@angular/forms';

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
    myForm: FormGroup;
    constructor(@Inject(MAT_DIALOG_DATA) public data: Professor,private _snackBar: MatSnackBar,private fb: FormBuilder) {}

    ngOnInit() {
      const url = `http://localhost:8083/api/v1/professors`;
      this.apiData = ajax(url);
      this.apiData.subscribe(res => {
        this.professors = res.response;
      });
     
      this.myForm = this.fb.group({
        active: new FormControl(''),
        professor: new FormControl(''),
        title: new FormControl(''),
        level: new FormControl(''),
        hours: new FormControl('')
      }) 
    }


  
    insertCourse($e){
      $e.preventDefault();
      const active = this.myForm.get('active').value;
      const title = this.myForm.get('title').value;
      const level = this.myForm.get('level').value;
      const hours = this.myForm.get('hours').value;

      console.log(this.myForm.value);
     
    
       let json = {
        "title":title,
        "professor": JSON.parse(this.myForm.controls.professor.value),
        "level": level,
        "hours": hours,
        "active": active
      } 
      this.myForm.reset;
      console.log(json.title)
      const url = `http://localhost:8083/api/v1/course`;
      this.apiData  = ajax({
        url: url,
        method: 'POST',
        body: json,
        headers: {
          'Content-Type': 'application/json',
          'rxjs-custom-header': 'Rxjs',
          'Access-Control-Allow-Origin': '*'
        }
      });
      this.apiData.subscribe(res => {
        console.log(res.response);
      });
    }

 

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 2000,
      });
    }

  }

