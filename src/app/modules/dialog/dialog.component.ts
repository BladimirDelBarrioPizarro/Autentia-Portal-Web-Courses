import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ajax } from 'rxjs/ajax';
import {FormBuilder,FormGroup,FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import{ AppConstants} from '../constants/AppConstants';
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
    fileURL;
    blob;
    arraybytes;
    URLPOST = AppConstants.POST_COURSES;
    URLGET = AppConstants.GET_PROFESSORS;
    HEADERS = AppConstants.HEADERS;
    constructor(@Inject(MAT_DIALOG_DATA) public data: Professor,private _snackBar: MatSnackBar,private fb: FormBuilder) {}

    ngOnInit() {
      this.apiData = ajax(this.URLGET);
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
      this.blob = new Blob([this.fileToUpload], {type: 'application/pdf'});
      this.fileURL = URL.createObjectURL(this.blob); 
       var reader = new FileReader();
      reader.readAsBinaryString(this.blob);
      reader.onloadend = (event) => {
          this.arraybytes = reader.result;  
       }        
  } 

 
   
    insertCourse($e){
      $e.preventDefault();
      const active = this.myForm.get('active').value;
      const title = this.myForm.get('title').value;
      const level = this.myForm.get('level').value;
      const hours = this.myForm.get('hours').value;
     
       let json = {
        "title":title,
        "professor": JSON.parse(this.myForm.controls.professor.value),
        "level": level,
        "hours": hours,
        "active": active,
        "fileURL": btoa(this.arraybytes)

      } 
      this.myForm.reset;
      this.apiData  = ajax({
        url: this.URLPOST,
        method: 'POST',
        body: json,
        headers: this.HEADERS,
      });
      this.apiData.subscribe(res => {
        this.openSnackBar("Course inserted correctly","SUCCESS")
      });
       let promise = new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve(window.location.reload()); 
      }, 5000);
    });  
    }


    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 2000,
        panelClass: ['green-snackbar']
      });
    }
  }

