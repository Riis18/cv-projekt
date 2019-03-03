import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Info} from '../../models/Info';
import {Education} from '../../models/Education';
import {Experience} from '../../models/Experience';
import {Job} from '../../models/Job';
import {ImageMetaData} from '../../models/ImageMetaData';

export interface ICvService {

  /* Variables */
  isSaved: BehaviorSubject<boolean>;
  basicInfo: BehaviorSubject<Info>;

  /* Read */
  /**
   * Fetches data from, and creates link to Firebase
   */
  fetchBasicInfo();

  /**
   * Returns an Observable containing an array of Education
   */
  getEducation(): Observable<Education[]>;

  /**
   * Returns an Observable containing an array of Experience
   */
  getExperiences(): Observable<Experience[]>;

  /**
   * Returns an Observable containing an array of Job
   */
  getJobs(): Observable<Job[]>;
  /* Update */
  /**
   * Updates BehaviorSubject in ICvService
   * @param about New text in about field
   */
  updateAbout(about: string);

  /**
   * Sends the updated data to firestore
   */
  save();

  /**
   * Updates the local picture
   * @param metaDataForImage Object containing image data
   */
  updatePic(metaDataForImage: ImageMetaData);


}
