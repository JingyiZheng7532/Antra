import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, switchMap } from 'rxjs';

export interface jobInfoItem {
  by: string;
  id: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url?: string;
  display?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient) {}

  getJobStories(): Observable<jobInfoItem[]> {
    return this.http.get<number[]>(' https://hacker-news.firebaseio.com/v0/jobstories.json').pipe(
      switchMap((ids: number[]) => {
        const infoObs: Observable<jobInfoItem>[] = ids.map((id: number) => this.getJobDetails(id));
        return forkJoin(infoObs);
      }),
    );
  }

  getJobDetails(id: number): Observable<jobInfoItem> {
    return this.http.get<jobInfoItem>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  }
}
