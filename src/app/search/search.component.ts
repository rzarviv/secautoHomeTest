import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from '../movies.service';
import { BehaviorSubject, map } from 'rxjs';
import { SearchResult } from '../utils/types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  movieSearchForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  searchResults$ = new BehaviorSubject<SearchResult[]>([]);
  genres$ = new BehaviorSubject<string[]>([]);

  constructor(private movieService: MoviesService) {
  }

  searchMovie() {
    if (this.movieSearchForm.invalid) {
      return;
    }

    const name = this.movieSearchForm.controls.name.value;
    this.movieService.searchMovie(name).subscribe((movies) => {
        const genres = this.getGenres(movies);
        this.genres$.next(genres);
        this.searchResults$.next(movies);
      });
  }

  getGenres(movies: SearchResult[]): string[] {
    const genres = new Set<string>();
    for (const movie of movies) {
      for (const genre of movie.genres) {
        genres.add(genre);
      }
    }
    return Array.from(genres);
  }
}
