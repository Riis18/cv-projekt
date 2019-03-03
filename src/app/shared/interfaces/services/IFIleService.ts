import {ImageMetaData} from '../../models/ImageMetaData';
import {Observable} from 'rxjs';

export interface IFileService {
  uploadImage(imageMetaData: ImageMetaData): Observable<ImageMetaData>;
  getFileUrl(id: string): Observable<string>;
}
