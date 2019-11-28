import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogDataExampleDialog} from '../dialog/dialog.component';
import { ajax } from 'rxjs/ajax';
import { isNgTemplate } from '@angular/compiler';

export interface UserData {
  title : string; //titulo
  level: string; //nivel
  professor: string;//profesor
  hours: string;//horas
}



@Component({
  selector: 'table-pagination',
  styleUrls: ['table.component.css'],
  templateUrl: 'table.component.html',
})

export class TableOverviewExample implements OnInit {
  displayedColumns: string[] = ['title', 'level', 'professor', 'hours'];
  dataSource: MatTableDataSource<UserData>;
  apiData;
  response;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog) {

    // Create 100 courses
   // const courses = Array.from({length: 50}, (_, k) => createNewCourse(k + 1,{}));
    // Assign the data to the data source for the table to render
   // this.dataSource = new MatTableDataSource(courses);
  }
  
  openDialog() {
    this.dialog.open(DialogDataExampleDialog, {
      data:{}
    });
  }

  ngOnInit() {
    this.apiData = ajax('http://localhost:8083/api/v1/course?page=0&size=10&sort=title');
    this.apiData.subscribe(res => {
      console.log(res.status, res.response)
      const courses = Array.from({length: res.response.length-1}, (_, k) =>createNewCourse(res.response.length,res.response));
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
}

function createNewCourse(id:number,res:object): UserData {
  let titleStr: string[] = [];
  let levelStr: string[] = [];
  let profesorStr: string[] = [];
  let horasStr:string[] = [];
  Object.entries(res).forEach(([key, value]) => {
    titleStr.push(value.title);
    levelStr.push(value.level);
    profesorStr.push(value.professor);
    horasStr.push(value.horas);
   });
      const title = titleStr[Math.round(Math.random() * (titleStr.length - 1))] ;

      const level = levelStr[Math.round(Math.random() * (levelStr.length - 1))];

      const profesor = profesorStr[Math.round(Math.random() * (profesorStr.length - 1))] ;

      const horas = horasStr[Math.round(Math.random() * (horasStr.length - 1))] ;
 
  return {
    title: title,
    level: level,
    professor: profesor,
    hours: horas
  };

}


  

 



