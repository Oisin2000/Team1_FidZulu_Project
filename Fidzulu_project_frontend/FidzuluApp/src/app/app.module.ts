import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TeamServiceService } from './services/team-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './main-page/main-page.component';
import { AboutPageComponent } from './about-page/about-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutPageComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [TeamServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
