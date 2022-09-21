import { Component, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
      
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  imageSource: string = '';
  requestMessage: string = '';
  bannerUploadForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    customer: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

    
  constructor(private http: HttpClient, private modalService: NgbModal) { }
      
  get form(){
    return this.bannerUploadForm.controls;
  }

  onFileChange(event:any) {
    const reader = new FileReader();
     
    if(event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
     
      reader.onload = () => {
    
        this.imageSource = reader.result as string;
      
        this.bannerUploadForm.patchValue({
          fileSource: file
        });
    
      };
    
    }
  }

  openModal(content: any) {
    this.modalService.open(JSON.parse(JSON.stringify(content))['arquivo'], { centered: true });
  }

  submit(){
    const formData = new FormData();
    formData.append('file', this.bannerUploadForm.get('fileSource')?.value!);
    formData.append('name', this.bannerUploadForm.get('name')?.value!);
    formData.append('customer', this.bannerUploadForm.get('customer')?.value!);
   
    this.http
      .post('http://localhost:8081/store/' + this.bannerUploadForm.get('customer')?.value! + '/banners', formData)
      .subscribe(res => {
        this.openModal(res);
      })
  }
}