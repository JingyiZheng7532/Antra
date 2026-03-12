import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FlightBooking } from './flight-booking/flight-booking';
import { FormsModule } from '@angular/forms';
import { Oneway } from './oneway/oneway';
import { Return } from './return/return';

@NgModule({
  declarations: [App, FlightBooking, Oneway, Return],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
