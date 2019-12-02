import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogDataExampleDialog} from '../dialog/dialog.component';
import { ajax } from 'rxjs/ajax';
import{ AppConstants} from '../constants/AppConstants';



@Component({
  selector: 'table-pagination',
  styleUrls: ['table.component.css'],
  templateUrl: 'table.component.html',
})

export class TableOverviewExample implements OnInit {
  displayedColumns: string[] = ['title', 'level', 'professor', 'hours','fileURL'];
  dataSource: MatTableDataSource<any>;
  apiData;
  urlGET = AppConstants.GET_COURSES;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog) {
  }
  
  openDialog() {
    this.dialog.open(DialogDataExampleDialog, {
      data:{}
    });
  }

  ngOnInit() {
    this.apiData = ajax(this.urlGET);
    this.apiData.subscribe(res => {
      const courses = res.response;
      console.log(courses)
      this.dataSource = new MatTableDataSource(courses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPDF(fileURL){
    console.log(fileURL)
 
    const fileName: string = 'temario.pdf';
    const byteArray = new Uint8Array(atob(fileURL).split('').map(char => char.charCodeAt(0)));
    let blob = new Blob([byteArray], {type: 'application/pdf'});
    
    const url = window.URL.createObjectURL(blob);
    window.open(url)
    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(fileURL);
  }
}




  

 



