import { Component } from '@angular/core';
import { UploadService } from 'src/app/shared/services/upload.service';

@Component({
  selector: 'slug',
  templateUrl: './slug.component.html',
  styleUrls: ['./slug.component.css']
})
export class SlugComponent {
  constructor(public uploader: UploadService) {}
}
