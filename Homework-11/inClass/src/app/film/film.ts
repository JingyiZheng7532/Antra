import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FilmService } from '../services/film-service';
import { concatMap, mergeMap, switchMap } from 'rxjs';

@Component({
  selector: 'app-film',
  standalone: false,
  templateUrl: './film.html',
  styleUrl: './film.scss',
})
export class Film implements OnInit {
  searchName = new FormControl('');
  titleList: Set<string> = new Set<string>();

  constructor(
    private filmService: FilmService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {}

  search() {
    console.log(this.searchName.value);
    const value = this.searchName && this.searchName.value ? this.searchName.value : '';
    // this.filmService.searchByName(value).subscribe((res) => {
    //   console.log('res: ', res);
    // });

    // concatMap: keep in order;
    // mergeMap: can be faster;
    if (value) {
      this.filmService
        .searchByName(value)
        .pipe(concatMap((filmUrl: string) => this.filmService.getFilmNames(filmUrl)))
        .subscribe((title: string) => {
          this.titleList.add(title);
          this.cdr.detectChanges();

          // // trigger the change detection manually
          // this.titleList = new Set(this.titleList);
          console.log(this.titleList);
        });
    }
  }
}
