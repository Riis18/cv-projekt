import {Inject, Injectable} from '@angular/core';
import {ICvService} from '../interfaces/services/ICvService';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Info} from '../models/Info';
import {Education} from '../models/Education';
import {Job} from '../models/Job';
import {Experience} from '../models/Experience';
import {first, map} from 'rxjs/operators';
import {ImageMetaData} from '../models/ImageMetaData';
import {IFileService} from '../interfaces/services/IFIleService';
import {UploadTaskSnapshot} from '@angular/fire/storage/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CvService implements ICvService {

  basicInfo = new BehaviorSubject<Info>(null);
  isSaved = new BehaviorSubject<boolean>(true);
  imageMetaData: ImageMetaData;

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore,
              @Inject('IFileService') private fileService: IFileService) {
  }

  fetchBasicInfo() {
    return this.db.doc<Info>('info/mainpage').valueChanges()
      .subscribe(info => {
        this.basicInfo.next(info);
      });
  }

  getEducation(): Observable<Education[]> {
    return this.db.collection<Education>('education').valueChanges()
      .pipe(
        map(edu => {
          return edu.sort((edua, edub) => {
            return edub.startYear - edua.startYear;
          });
        })
      );
  }

  getExperiences(): Observable<Experience[]> {
    return this.db.collection<Experience>('experiences').valueChanges();
  }

  getJobs(): Observable<Job[]> {
    return this.db.collection<Job>('jobs').valueChanges()
      .pipe(
        map(jobs => {
          return jobs.sort((joba, jobb) => {
            return jobb.startDate - joba.startDate;
          });
        })
      );
  }

  updateAbout(about: string) {
    this.updateBasicInfo('about', about);
  }

  save() {
    this.fileService.uploadImage(this.imageMetaData)
      .subscribe(uploadTask => {
        const task = uploadTask as unknown as UploadTaskSnapshot;
        const fullPath = task.metadata.fullPath;
        const id = fullPath.substr(fullPath.lastIndexOf('/'));
        this.fileService.getFileUrl(id)
          .subscribe(url => {
            this.db.doc('info/mainpage').update({imageUrl: url});
          });
      });
    this.db.doc('info/mainpage').update(this.basicInfo.value);
    this.isSaved.next(true);
  }

  updatePic(imageMetaData: ImageMetaData) {
    this.imageMetaData = imageMetaData;
    this.isSaved.next(false);
  }

  /**
   * Updates value inside BehaviorSubject basicInfo
   * @param index Key of the Value to change
   * @param data New value
   */
  private updateBasicInfo(index: string, data: any) {
    const basicInfo = this.basicInfo.value;
    basicInfo[index] = data;
    this.basicInfo.next(basicInfo);
    this.isSaved.next(false);
  }

}
