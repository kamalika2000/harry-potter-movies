import { Component } from '@angular/core';
import { MovieServiceService } from '../services/movie-service.service';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { movies } from '../model/movie-model';
import { CommonModule } from '@angular/common';
import { FormatHoursPipe } from '../pipes/format-hours.pipe';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, FormatHoursPipe, RouterLink],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  public movieId: string = '';
  public movieDetails$ = new Observable<movies>;
  constructor(private movieService: MovieServiceService, private route: ActivatedRoute){

  }
  ngOnInit(){
    this.movieId = this.route.snapshot.params['id'];
    if(this.movieId){
      this.movieService.getMovieDetails(this.movieId);
      this.movieDetails$ = this.movieService.movieDetails$;
    }
  }
  getArraynames(arr: Array<string>[]){
    if(arr)
    return arr.toString();

    return "";
  }
}
