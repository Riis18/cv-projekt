import {FileMetaData} from './FileMetaData';

export class ImageMetaData extends FileMetaData {
  base64Image?: string;
  imageBlob?: Blob;
}
