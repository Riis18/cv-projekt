import {Component, Input, OnInit} from '@angular/core';
import {Job} from '../../shared/models/Job';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  @Input() jobs: Job[];

  constructor() { }

  ngOnInit() {
  }

}
