import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogDataExampleDialog} from '../dialog/dialog.component';
import { isNgTemplate } from '@angular/compiler';

export interface UserData {
  id : string; //titulo
  name: string; //nivel
  progress: string;//profesor
  color: string;//horas
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */


@Component({
  selector: 'table-pagination',
  styleUrls: ['table.component.css'],
  templateUrl: 'table.component.html',
})
export class TableOverviewExample implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog) {
    // Create 100 users
    const users = Array.from({length: 50}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }
  
  openDialog() {
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        animal: 'panda'
      }
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

const response = [
  {
      "id": 1,
      "title": "Introducción a JSF 2",
      "professor": "Roberto Canales",
      "level": "Intermedio",
      "hours": 25,
      "active": true
  },
  {
      "id": 3,
      "title": "Novedades en Java 8",
      "professor": "David Goméz",
      "level": "Básico",
      "hours": 10,
      "active": true
  },
  {
      "id": 4,
      "title": "Java para sistemas",
      "professor": "Alberto Moratilla",
      "level": "Básico",
      "hours": 25,
      "active": true
  },
  {
      "id": 5,
      "title": "Angular 2",
      "professor": "Rubén Aguilera",
      "level": "Intermedio",
      "hours": 25,
      "active": true
  }
]




/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

    //Array y push algoritmo de createNewUser
    let titleStr: string[] = [];
      for (const prop in response) {
        console.log(`obj.${prop} = ${response[prop].title}`);
        titleStr.push(response[prop].title);
      }

      let levelStr: string[] = [];
      for (const prop in response) {
        console.log(`obj.${prop} = ${response[prop].level}`);
        levelStr.push(response[prop].level);
      }

      let profesorStr: string[] = [];
      for (const prop in response) {
        console.log(`obj.${prop} = ${response[prop].professor}`);
        profesorStr.push(response[prop].professor);
      }
    
      const title = titleStr[Math.round(Math.random() * (titleStr.length - 1))] ;

      const level = levelStr[Math.round(Math.random() * (levelStr.length - 1))];

      const profesor = profesorStr[Math.round(Math.random() * (profesorStr.length - 1))] ;
 
  return {
    id: title,
    name: level,
    progress: profesor,
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };

}


  

 



