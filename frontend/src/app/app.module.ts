import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { BannerComponent } from './pages/banner/banner.component';
import { ImageComponent } from './shared/components/atoms/image/image.component';
import { SlugComponent } from './shared/components/atoms/slug/slug.component';
import { TextComponent } from './shared/components/atoms/text/text.component';
import { ButtonComponent } from './shared/components/molecules/button/button.component';
import { HeaderComponent } from './shared/components/molecules/header/header.component';
import { UploadComponent } from './shared/components/organisms/upload/upload.component';
import { UploadTemplateComponent } from './shared/components/templates/upload/upload.component';
import { NotificationComponent } from './shared/components/atoms/notification/notification.component';

@NgModule({
  declarations: [
    BannerComponent,
    TextComponent,
    HeaderComponent,
    ImageComponent,
    ButtonComponent,
    SlugComponent,
    UploadComponent,
    UploadTemplateComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [BannerComponent]
})
export class AppModule { }
