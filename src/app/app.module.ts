import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutes } from './app.routes';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingpgComponent } from './landingpg/landingpg.component';
import { BcviewerComponent } from './bcviewer/bcviewer.component';
import {DataTableModule} from "angular2-datatable";
import { MainlandingComponent } from './mainlanding/mainlanding.component';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { LandingimComponent } from './landingim/landingim.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    LandingpgComponent,
    BcviewerComponent,
    MainlandingComponent,
    LandingimComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DataTableModule,
    RouterModule.forRoot(AppRoutes, { useHash: true }),
    HttpModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [],
  bootstrap: [AppComponent, HeaderComponent]
})
export class AppModule { }
