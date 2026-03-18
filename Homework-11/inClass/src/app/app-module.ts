import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Film } from './film/film';
import { ReactiveFormsModule } from '@angular/forms';
import { FilmService } from './services/film-service';

@NgModule({
  declarations: [App, Film],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [provideBrowserGlobalErrorListeners(), FilmService],
  bootstrap: [App],
})
export class AppModule {}
