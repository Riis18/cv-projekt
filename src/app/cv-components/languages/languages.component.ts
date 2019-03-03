import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  @Input() language: any[];

  constructor() {
  }

  ngOnInit() {
  }


  arrayFromObject(obj) {
    return obj !== null ? Object.keys(obj).map((key) => ({key: key, value: obj[key]})) : [];
  }

}
