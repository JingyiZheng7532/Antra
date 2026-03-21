import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Tab } from './tab/tab';
import { TabGroup } from './tab-group/tab-group';
import { TabService } from './services/tab-service';

@NgModule({
  declarations: [App, Tab, TabGroup],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners(), TabService],
  bootstrap: [App],
})
export class AppModule {}
