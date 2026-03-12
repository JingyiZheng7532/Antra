import { Component } from '@angular/core';

@Component({
  selector: 'app-flight-booking',
  standalone: false,
  templateUrl: './flight-booking.html',
  styleUrl: './flight-booking.scss',
})
export class FlightBooking {
  selectedType: string = '';
}
