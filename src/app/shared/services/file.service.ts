import {Injectable} from '@angular/core';
import {IFileService} from '../interfaces/services/IFileService';
import {ImageMetaData} from '../models/ImageMetaData';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {defer, Observable, pipe} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {FileMetaData} from '../models/FileMetaData';

@Injectable({
  providedIn: 'root'
})
export class FileService implements IFileService {

  constructor(private db: AngularFirestore,
              private storage: AngularFireStorage) {
  }

  uploadImage(imageMetaData: ImageMetaData): Observable<ImageMetaData> {
    if (imageMetaData.imageBlob) {
      const fileToUpload = new File(
        [imageMetaData.imageBlob],
        imageMetaData.name,
        {type: imageMetaData.type}
      );
      return this.uploadMetaData(imageMetaData)
        .pipe(
          switchMap(metaData => {
            return this.uploadFile(fileToUpload, metaData);
          })
        );
    }
  }

  private uploadMetaData(metaData: FileMetaData): Observable<FileMetaData> {
    return defer(() =>
      this.db.collection('files').add({
        name: metaData.name,
        type: metaData.type,
        size: metaData.size,
        lastModified: -1
      })
    ).pipe(
      map((documentRef) => {
        metaData.id = documentRef.id;
        return metaData;
      })
    );
  }

  private uploadFile(file: File, metaData: FileMetaData): Observable<FileMetaData> {
    return defer(() =>
      this.storage.ref('profile-pictures/' + metaData.id)
        .put(file)
        .then()
    );
  }

  getFileUrl(id: string): Observable<string> {
    return this.storage.ref('profile-pictures/' + id)
      .getDownloadURL();
  }
}
