import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  countryDropDownValue = 'India';
  disasterDropdownValue = 'Earthquake';
  // tslint:disable-next-line:ban-types
  apiURL: String = 'http://127.0.0.1:5000/api';
  constructor(private http: HttpClient) {}
  filterData;
  fromValue = 2010;
  toValue = 2018;
  // chart labels
  occuranceLabels = [];
  deathLabels = [];
  economyLabels = [];
  affectedLabels = [];
  // chart data
  occuranceData = [];
  deathData = [];
  economyData = [];
  affectedData = [];
  // dropdowns
  countries;
  disasterType;
  yearData;
  // schem
  // chart options
  occuranceOptions = {
    responsive: true,
    elements: {
      line: {
        tension: 0
      }
    }
  };
  deathOptions = {
    responsive: true
  };
  economyOptions = {
    responsive: true,
    elements: {
      line: {
        tension: 0
      }
    }
  };
  affectedOptions = {
    responsive: true
  };

  // test
  lookup = {};
  result = [];
  name;
  chartColors: Array<any> = [
    { // first color
      backgroundColor: '#2980B9',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }];

  peoplechartColors: Array<any> = [
    { // first color
      backgroundColor: '#EC7063',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }];
  onChartClick(event) {
    console.log(event);
  }
  countryDropdownChange(country) {
    this.countryDropDownValue = country;
    this.getRange();
  }
  disasterDropdownChange(type) {
    this.disasterDropdownValue = type;
    this.getRange();
  }
  onToYearChange(to) {
    this.toValue = to;
    this.getRange();
  }
  onFromYearChange(from) {
    this.fromValue = from;
    this.getRange();
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
      this.disasterType = typeData;
      // console.log(this.disasterType);
    }, error => {});
  }

  getYear() {
    this.http.get(this.apiURL + '/year/getYear').
    subscribe(yearData => {
      this.yearData = yearData;
      // console.log(this.disasterType);
    }, error => {});
  }
  getRange() {

  /*
    // this.fromValue = 2000;
    // this.toValue = 2018;
    this.occuranceLabels = [];
    this.deathLabels = [];
    this.economyLabels = [];
    this.affectedLabels = [];
    // data from api
    const totalDeaths = [];
    const totalOccurance = [];
    const economyDamage = [];
    const totalPeopleAffected = [];
    console.log('country: ' + this.countryDropDownValue + ' type: ' + this.disasterDropdownValue);
    this.http.get(this.apiURL + '/yearRange?from=' + this.fromValue + '&to=' + this.toValue + '&country=' +
      this.countryDropDownValue + '&type=' + this.disasterDropdownValue).
    subscribe((rangeData: Data[]) => { this.filterData = rangeData;
      rangeData.forEach(y => {
        this.occuranceLabels.push(y.year);
        this.deathLabels.push(y.year);
        this.economyLabels.push(y.year);
        this.affectedLabels.push(y.year);
        totalDeaths.push(y.totalDeaths);
        totalOccurance.push(y.occurrence);
        economyDamage.push(y.totalDamage);
        totalPeopleAffected.push(y.totalAffected);
      });
      this.deathData = [{data: totalDeaths, label: this.disasterDropdownValue}];
      this.occuranceData = [{data: totalOccurance, label: this.disasterDropdownValue}];
      this.economyData = [{data: economyDamage, label: this.disasterDropdownValue}];
      this.affectedData = [{data: totalPeopleAffected, label: this.disasterDropdownValue}];
      // console.log(this.fromValue);
    }, error => {});
  */
  }

  generateGraph() {
    this.getRange();
  }
  ngOnInit() {
    this.getCountries();
    this.getType();
    this.getYear();
    this.getRange();
  }

}
