import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {
  HttpErrorResponse,
} from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient) { }

  messageColor = ''
  message = ''
  slug = ''
  fileToUpload: File | null = null
  image: string | ArrayBuffer | null = null

  updateSlug(newSlug: string) {
    this.slug = newSlug
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

    if (!this.fileToUpload || !this.slug) return

    const reader = new FileReader()
    reader.onload = e => this.image = reader.result

    reader.readAsDataURL(this.fileToUpload)

    const formData: FormData = new FormData()
    formData.append('banner', this.fileToUpload, this.fileToUpload.name);
    this.http.post(`http://localhost:${environment.publicApiPort}/store/${this.slug}/banners`, formData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error.error) {
            this.message = error.error.error
            this.messageColor = 'red'
          }

          return EMPTY
        })
      )
      .subscribe()


    if (!this.message) {
      this.messageColor = 'green'
      this.message = 'Banner uploaded'
    }
  }
}
