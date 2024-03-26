import { Component } from '@angular/core';
import { MovieServiceService } from '../services/movie-service.service';
import { Observable } from 'rxjs';
import { movies } from '../model/movie-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormatHoursPipe } from '../pipes/format-hours.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-listings',
  standalone: true,
  imports: [FormsModule, CommonModule, FormatHoursPipe, RouterLink],
  templateUrl: './movie-listings.component.html',
  styleUrl: './movie-listings.component.css'
})
export class MovieListingsComponent {
  public allList$ = new Observable<movies[]>;
  public title: string = '';
  public release_date: string = '';
  constructor(private movieService: MovieServiceService){

  }
  ngOnInit(){
    console.log("test"); 
    this.movieService.getMovies();
    this.allList$ = this.movieService.movieList$;
  }
  filterValueChanges(event: any){
    let filterData = <movies>{};
    filterData.title = this.title;
    filterData.release_date = this.release_date;
    this.movieService.getMovies(filterData);
  }
}
