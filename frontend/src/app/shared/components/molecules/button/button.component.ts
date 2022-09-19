import { Component, Input } from '@angular/core';
import { UploadService } from 'src/app/shared/services/upload.service';

@Component({
  selector: 'custom-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  constructor(public uploader: UploadService) {}

  @Input()
  text: string;

  openUpload() {
    const el = document.getElementById('file-upload');
    if (!el) return
    el.click();
  }
}
