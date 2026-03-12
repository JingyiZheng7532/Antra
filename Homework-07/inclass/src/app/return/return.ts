import { Component } from '@angular/core';

@Component({
  selector: 'app-return',
  standalone: false,
  templateUrl: './return.html',
  styleUrl: './return.scss',
})
export class Return {
  goDate: Date | undefined;
  backDate: Date | undefined;

  bookReturn() {
    if (!this.goDate || !this.backDate) {
      return;
    }

    const today = new Date();
    const go = new Date(this.goDate);
    const back = new Date(this.backDate);

    if (go < today || back < today || back < go) {
      return;
    }

    alert(
      'You have booked a return flight, departing on' +
        this.goDate +
        ' and returning on ' +
        this.backDate,
    );
  }
}
