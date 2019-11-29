import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ajax } from 'rxjs/ajax';
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

@Component({
  templateUrl: 'snackbar.component.html',
  styleUrls: ['./dialog.component.css']
})

  export class DialogDataExampleDialog {
    apiData;
    professors;
    myForm: FormGroup;
    fileToUpload: File = null;
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
        hours: new FormControl(''),
        path:new FormControl('')
      }) 
    }

    handleFileInput(files: FileList) {
      this.fileToUpload = files.item(0);
      console.log(this.fileToUpload)
  }

    fileChange($e) {
      console.log($e)
      var input = document.querySelector('input[type=file]');
      console.log(input);
     
      var reader = new FileReader();
     // reader.readAsText(file);
     /*  if (files && files.length > 0) {
       let file = files[0];
       let formData = new FormData();
       formData.append('file', file);
       console.log(formData)

      }   */

      /**
       * 
       * function readFile(event) {
  textarea.textContent = event.target.result;
  console.log(event.target.result);
}

function changeFile() {
  var file = input.files[0];
  var reader = new FileReader();
  reader.addEventListener('load', readFile);
  reader.readAsText(file);
}

input.addEventListener('change', changeFile);
       * 
       * 
       * 
       */








    }
    insertCourse($e){
      $e.preventDefault();
      const active = this.myForm.get('active').value;
      const title = this.myForm.get('title').value;
      const level = this.myForm.get('level').value;
      const hours = this.myForm.get('hours').value;
     /*  const path = this.myForm.get('path').value;
      const path2 = path.replace("C:\\fakepath\\",""); */
     
       let json = {
        "title":title,
        "professor": JSON.parse(this.myForm.controls.professor.value),
        "level": level,
        "hours": hours,
        "active": active
      } 
      this.myForm.reset;
      
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
        this.openSnackBar("Course inserted correctly","SUCCESS")
      });
     // window.location.reload();
    }

 

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 10000,
      });
    }

  }

