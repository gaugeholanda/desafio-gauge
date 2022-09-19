import { Component } from '@angular/core';
import { UploadService } from 'src/app/shared/services/upload.service';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  constructor(public uploader: UploadService) {}
}
