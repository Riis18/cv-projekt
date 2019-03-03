import {ImageMetaData} from './models/ImageMetaData';

export class FileHelpers {
  public static verifyMetaData(imageMetaData: ImageMetaData): boolean {
    return !!(imageMetaData && imageMetaData.name && imageMetaData.type &&
      (imageMetaData.imageBlob || imageMetaData.base64Image));
  }
}
