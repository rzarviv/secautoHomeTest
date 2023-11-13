import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchResult } from 'src/app/utils/types';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  @Input() results: SearchResult[] = [];
  @Input() genres: string[] = [];
  filtered$ = new BehaviorSubject<SearchResult[]>([]);
  filtered = false;

  constructor() {
  }

  showInfo(movie: SearchResult) {
    console.log(movie);
  }

  filterResults(event: Event) {
    const movieGenre = (event.target as HTMLSelectElement).value as string;
    if (!movieGenre) {
      this.filtered = false;
      this.filtered$.next(this.results);
    } else {
      this.filtered = true;
      this.filtered$.next(
        this.results.filter(
          movie => movie.genres.findIndex((genre) => movieGenre === genre) !== -1));
    }
  }
}
