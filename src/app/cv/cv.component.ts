import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ICvService} from '../shared/interfaces/services/ICvService';
import {Info} from '../shared/models/Info';
import {Subscription} from 'rxjs';
import {Education} from '../shared/models/Education';
import {Experience} from '../shared/models/Experience';
import {Job} from '../shared/models/Job';
import {switchMap} from 'rxjs/operators';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit, OnDestroy {

  basicInfo: Info;
  educations: Education[];
  experiences: Experience[];
  jobs: Job[];
  isSaved = true;

  sub: Subscription;

  constructor(@Inject('ICvService') private cvService: ICvService) { }

  ngOnInit() {
    this.cvService.fetchBasicInfo();
    this.sub = this.cvService.basicInfo
      .pipe(
        switchMap(basicInfo => {
          this.basicInfo = basicInfo;
          return this.cvService.getEducation();
        })
      )
      .pipe(
        switchMap(educations => {
          this.educations = educations;
          return this.cvService.getExperiences();
        })
      ).pipe(
        switchMap(experiences => {
          this.experiences = experiences;
          return this.cvService.getJobs();
        })
      )
      .pipe(
        switchMap(jobs => {
          this.jobs = jobs;
          return this.cvService.isSaved;
        })
      ).subscribe(isSaved => {
        this.isSaved = isSaved;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSave() {
    this.cvService.save();
  }

}
