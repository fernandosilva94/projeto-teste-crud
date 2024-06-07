import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro/cadastro.component';

import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent, LoginComponent, DashboardComponent
  ],
  imports: [
    BrowserModule, CommonModule, ReactiveFormsModule, AppRoutingModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
