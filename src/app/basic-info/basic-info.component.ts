import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {ICvService} from '../shared/interfaces/services/ICvService';
import {Info} from '../shared/models/Info';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {Subscription} from 'rxjs';
import {ImageMetaData} from '../shared/models/ImageMetaData';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit, OnDestroy {

  @Input() info: Info;

  isEditingPic = false;
  croppedImage = '';
  croppedBlob: Blob;
  imageChangedEvent: any;
  sub: Subscription;

  constructor(@Inject('ICvService') private cvService: ICvService) {
  }

  ngOnInit() {
    this.sub = this.cvService.basicInfo
      .subscribe(info => {
        this.croppedImage = info === null ? '' : info.imageUrl;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onToggleEditPic() {
    this.isEditingPic = !this.isEditingPic;
  }

  onPicChange(event) {
    this.imageChangedEvent = event;
  }

  onImageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedBlob = event.file;
  }

  onSave() {
    this.cvService.updatePic(this.getMetaDataForImage());
    this.isEditingPic = false;
  }

  private getMetaDataForImage(): ImageMetaData {
    if (this.imageChangedEvent && this.imageChangedEvent.target &&
      this.imageChangedEvent.target.files &&
      this.imageChangedEvent.target.files.length > 0) {
      const fileBeforeCrop = this.imageChangedEvent.target.files[0];
      return {
        base64Image: this.croppedImage,
        imageBlob: this.croppedBlob,
        name: fileBeforeCrop.name,
        type: 'image/png',
        size: fileBeforeCrop.size
      };
    }
    return undefined;
  }

}
