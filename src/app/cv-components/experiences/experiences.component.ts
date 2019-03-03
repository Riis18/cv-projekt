import {Component, Input, OnInit} from '@angular/core';
import {Experience} from '../../shared/models/Experience';
import {repeat} from 'rxjs/operators';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent implements OnInit {

  @Input() experiences: Experience[];

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Generates the visual rating
   * @param count Rating for the experience of 5 stars
   */
  genStars(count: number) {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  }
}
