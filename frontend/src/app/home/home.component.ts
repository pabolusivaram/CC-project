import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from '../local-storage.service';
import {Router} from '@angular/router';
import {Data} from '../Data';
import {range} from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  constructor(public dialog: MatDialog, public http: HttpClient, public localStorage: LocalStorageService, public router: Router) { }

  public loginUser: string;

  countries;
  products;
  years;

  // tslint:disable-next-line:ban-types
  apiURL: String = 'https://load-trade-data.herokuapp.com/api';


  // tslint:disable-next-line:ban-types
  countryValue = 'Australia'; productValue = 'Fuels'; fromYear = '2008'; toYear = '2012';
  private filterData: Data[];

  public yearDatasets: Array<any> = [{data: {}, label: this.productValue + ' & ' + this.countryValue}];
  public yearLabels: Array<any> = [];

  public countryDatasets: Array<any> = [{data: {}, label: this.productValue}];
  public countryLabels: Array<any> = [];

  public typeDatasets: Array<any> = [{data: {}, label: this.countryValue}];
  public typeLabels: Array<any> = [];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  ngOnInit() {

    this.loginUser = this.localStorage.getUserEmail();
    if ( this.loginUser === undefined ) {
      this.router.navigate(['/login']);
    }

    this.getCountries();
    this.getType();
    this.getYear();
  }

  getCountries() {
    this.http.get(this.apiURL + '/country/getCountries').
    subscribe(countryData => {
      this.countries = countryData;
      // console.log(this.countries);
    }, error => {});
  }

  getType() {
    this.http.get(this.apiURL + '/type/getProductType').
    subscribe(typeData => {
      this.products = typeData;
      // console.log(this.disasterType);
    }, error => {});
  }

  getYear() {
    this.http.get(this.apiURL + '/year/getYear').
    subscribe(yearData => {
      this.years = yearData;
      // console.log(this.disasterType);
    }, error => {});
  }

  getRange() {

    console.log('country: ' + this.countryValue + ' type: ' + this.productValue);
    this.http.get(this.apiURL + '/yearCompare?from=' + this.fromYear + '&to=' + this.toYear + '&country=' +
      this.countryValue + '&type=' + this.productValue).
    subscribe((rangeData: Data[]) => { this.filterData = rangeData;
                                       this.yearLabels = [];
                                       const totalExports = [];
                                       rangeData.forEach(y => {
                                         console.log(rangeData);
                                         this.yearLabels.push(y.Year);
                                         totalExports.push(y.Value);
                                       }
                                       );
                                       this.yearDatasets = [{data: totalExports, label: this.productValue}];
    }, error => {});

    this.http.get(this.apiURL + '/countryCompare?from=' + this.fromYear + '&to=' + this.toYear + '&type=' + this.productValue).
    subscribe((rangeData: Data[]) => { this.filterData = rangeData;
                                       this.countryLabels = [];
                                       const totalExports = [];
                                       rangeData.forEach(y => {
                                         console.log(rangeData);
                                         this.countryLabels.push(y.CountryName);
                                         totalExports.push(y.Value);
                                       }
                                       );
                                       this.countryDatasets = [{data: totalExports, label: this.productValue}];
    }, error => {});

    this.http.get(this.apiURL + '/typeCompare?from=' + this.fromYear + '&to=' + this.toYear + '&country=' +
      this.countryValue).
    subscribe((rangeData: Data[]) => { this.filterData = rangeData;
                                       this.typeLabels = [];
                                       const totalExports = [];
                                       rangeData.forEach(y => {
                                         console.log(rangeData);
                                         this.typeLabels.push(y.Product);
                                         totalExports.push(y.Value);
                                       }
                                       );
                                       this.typeDatasets = [{data: totalExports, label: this.productValue}];
    }, error => {});
  }
  generateGraph() {
    this.getRange();
  }

  onToYearChange() {
    console.log(this.toYear);
    this.getRange();
  }
  onFromYearChange() {
    console.log(this.fromYear);
    this.getRange();
  }

  onCountryChange() {
    console.log(this.countryValue);
    this.getRange();
  }

  onProductChange() {
    console.log(this.productValue);
    this.getRange();
  }
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}
