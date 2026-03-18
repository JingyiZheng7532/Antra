import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, map, mergeMap, Observable } from 'rxjs';

export interface ResultInfo {
  name: string;
  films: string[];
}

export interface filmItem {
  episode_id: number;
  title: string;
  release_date: string;
}

export interface SearchNameResponse {
  results: ResultInfo[];
}

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  constructor(private http: HttpClient) {}

  getFilmNames(filmUrl: string): Observable<filmItem> {
    return this.http.get<filmItem>(filmUrl);
  }

  searchByName(name: string): Observable<string> {
    return this.http.get<SearchNameResponse>('https://swapi.dev/api/people/?search=' + name).pipe(
      map((val: SearchNameResponse) => val.results),
      mergeMap((results: ResultInfo[]) => from(results)),
      map((result: ResultInfo) => result.films),
      mergeMap((films: string[]) => from(films)),
    );
  }
}
