import { ChangeDetectorRef, Component } from '@angular/core';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-film',
  standalone: false,
  templateUrl: './film.component.html',
  styleUrl: './film.component.scss',
})
export class FilmComponent {
  name: string = 'Luke Skywalker';
  films: any[] = [];

  constructor(
    private filmService: FilmService,
    private cdr: ChangeDetectorRef,
  ) {}

  getfilms() {
    this.filmService.getFilms(this.name).subscribe((films) => {
      console.log(films);
      this.films = films;
      this.cdr.detectChanges();
    });
  }
  changeDetection() {
    throw new Error('Method not implemented.');
  }
}
