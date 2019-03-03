import {Component, Inject, Input, OnInit} from '@angular/core';
import {ICvService} from '../../shared/interfaces/services/ICvService';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  @Input() about: string;

  isEditing = false;

  constructor(@Inject('ICvService') private cvService: ICvService) { }

  ngOnInit() {
  }

  onToggleEdit(event: MouseEvent) {
    this.isEditing = !this.isEditing;
  }

  onInitialSave(event: KeyboardEvent) {
    // Press ctrl + enter to save locally
    if (event.ctrlKey) {
      const srcElement = event.srcElement as HTMLTextAreaElement;
      this.cvService.updateAbout(srcElement.value);
      this.isEditing = false;
    }
  }

}
