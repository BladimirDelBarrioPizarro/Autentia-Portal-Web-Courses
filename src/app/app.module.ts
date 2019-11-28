import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { TableOverviewExample } from './modules/table/table.component';
import { MatPaginator} from '@angular/material/paginator';
import {MatFormFieldModule, MatInputModule, MatSelectModule,MatTooltipModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogDataExampleDialog} from './modules/dialog/dialog.component';
import { HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableOverviewExample,
    MatPaginator,
    DialogDataExampleDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule
  ],
  exports:[
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    DialogDataExampleDialog
  ],
  entryComponents:[
    DialogDataExampleDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
