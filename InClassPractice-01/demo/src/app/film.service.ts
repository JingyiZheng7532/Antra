import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  constructor(private http: HttpClient) {}

  getFilms(name: string): Observable<any> {
    return this.http.get('https://swapi.info/api/people').pipe(
      map((res: any) => res.find((item: any) => item.name === name)),
      switchMap((person: any) => {
        if (person && person.films && person.films.length > 0) {
          const filmObservables = person.films.map((filmUrl: string) =>
            this.http.get(filmUrl).pipe(
              map((film: any) => {
                return {
                  title: film.title,
                  year: film.release_date.split('-')[0],
                };
              }),
            ),
          );
          return forkJoin(filmObservables);
        } else {
          return of([]);
        }
      }),
    );
  }
}
