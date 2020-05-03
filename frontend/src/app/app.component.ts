import {Component, Inject, OnInit} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from "ngx-webstorage-service";
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "./local-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Trade-Analysis';
}
