import { NgModule, Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { HttpClientModule } from '@angular/common/http';
import {ApiService} from './services/api.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';






@NgModule({
  declarations: [
    AppComponent,
    TaskComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatCardModule
  ],
  exports: [MatCardModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
