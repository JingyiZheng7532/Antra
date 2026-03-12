import { Component } from '@angular/core';

@Component({
  selector: 'app-oneway',
  standalone: false,
  templateUrl: './oneway.html',
  styleUrl: './oneway.scss',
})
export class Oneway {
  selectedDate: Date | undefined;

  bookOneWay() {
    if (!this.selectedDate) return;

    const selected = new Date(this.selectedDate);
    const today = new Date();

    // console.log('Selected Time:', selected.getTime());
    // console.log('Today Time:', today.getTime());

    if (selected < today) {
      return;
    }

    alert('You have booked a one-way flight on ' + this.selectedDate);
  }
}
