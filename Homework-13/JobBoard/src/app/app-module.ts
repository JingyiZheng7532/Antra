import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Board } from './board/board';
import { JobService } from './services/job-service';

@NgModule({
  declarations: [App, Board],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners(), JobService],
  bootstrap: [App],
})
export class AppModule {}
