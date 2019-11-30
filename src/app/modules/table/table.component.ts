import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogDataExampleDialog} from '../dialog/dialog.component';
import { ajax } from 'rxjs/ajax';
import { ConsoleReporter } from 'jasmine';



@Component({
  selector: 'table-pagination',
  styleUrls: ['table.component.css'],
  templateUrl: 'table.component.html',
})

export class TableOverviewExample implements OnInit {
  displayedColumns: string[] = ['title', 'level', 'professor', 'hours','fileURL'];
  dataSource: MatTableDataSource<any>;
  apiData;
  page:'0';
  size:'10';
  sorted:'title';
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
    const url = `http://localhost:8083/api/v1/course?page=0&size=10&sort=title`;
    this.apiData = ajax(url);
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
    console.log("getpdf")
    const fileName: string = 'my-test.pdf';
    const blob: Blob = new Blob([fileURL], {type: 'application/pdf'});
    
    const objectUrl: string = URL.createObjectURL(blob);
    console.log(objectUrl)
    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

    a.href = objectUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();        

    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl); 
  }
}




  

 



