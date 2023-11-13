import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResult } from './utils/types';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private api = 'https://api.tvmaze.com/search/shows?q=';

  constructor(private http: HttpClient) { }

  searchMovie(name: string): Observable<SearchResult[]> {
    return this.http.get(`${this.api}${name}`)
      .pipe(
        map(results => this.transformResults(results)),
      );
  }

  private transformResults(movies: any): SearchResult[] {
    const results = new Array<SearchResult>();
    for (const movie of (movies as any[])) {
      const show = (movie as any).show;
      const { name, type, genres, id } = show;
      const { medium } = show.image ?? '';

      const result: SearchResult = { name, type, genres, id };
      if (medium != undefined) {
        result.image = medium;
      }
      results.push(result);
    }

    return results;
  }

}
