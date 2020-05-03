import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StorageServiceModule} from 'ngx-webstorage-service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {
  MatButtonModule,
  MatCardModule, MatDatepickerModule,
  MatDialogModule, MatFormFieldModule, MatGridList, MatGridListModule,
  MatIconModule, MatInputModule, MatLabel,
  MatListModule, MatNativeDateModule,
  MatProgressBarModule, MatSelectModule, MatSidenavModule, MatTabsModule,
  MatToolbarModule, MatTreeModule
} from '@angular/material';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {UploadService} from './upload.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {LocalStorageService} from './local-storage.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ControlMessagesComponent } from './control-messages/control-messages.component';
import {ValidationService} from './validation.service';
import { SafeHtmlPipe } from './safe-html.pipe';
import { ReportComponent } from './report/report.component';
import {ChartsModule} from 'ng2-charts';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ControlMessagesComponent,
    SafeHtmlPipe,
    ReportComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatProgressBarModule,
    MatListModule,
    MatSelectModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StorageServiceModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatListModule,
    MatTreeModule,
    MatSidenavModule,
    MatGridListModule
  ],
  providers: [UploadService, HttpClientModule, LocalStorageService, ValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
