import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { SearchResultsComponent } from './search-results/search-results.component';


@NgModule({
  declarations: [
    SearchComponent,
    SearchResultsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    SearchComponent,
  ]
})
export class SearchModule { }
