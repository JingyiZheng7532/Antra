import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filmItem, FilmService } from '../services/film-service';
import { concatMap, mergeMap, switchMap } from 'rxjs';

@Component({
  selector: 'app-film',
  standalone: false,
  templateUrl: './film.html',
  styleUrl: './film.scss',
})
export class Film implements OnInit {
  searchName = new FormControl('');
  filmList: filmItem[] = [];
  seen: Set<number> = new Set();

  constructor(
    private filmService: FilmService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {}

  search() {
    const value = this.searchName && this.searchName.value ? this.searchName.value : '';

    // concatMap: keep in order;
    // mergeMap: can be faster;
    if (value) {
      this.filmService
        .searchByName(value)
        .pipe(concatMap((filmUrl: string) => this.filmService.getFilmNames(filmUrl)))
        .subscribe((film: filmItem) => {
          if (!this.seen.has(film.episode_id)) {
            this.filmList.push(film);
            this.seen.add(film.episode_id);
            this.cdr.detectChanges();
          }
        });
    }
  }
}
