import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, map, throwError } from 'rxjs';
import { movies } from '../model/movie-model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  private movieList = new BehaviorSubject<movies[]>([]);
  public movieList$ = this.movieList.asObservable();
  private mainMovieList = new Array<movies>;
  private filteredMovieList = new Array<movies>;
  private movieDetails = new BehaviorSubject<movies>({} as movies);
  public movieDetails$ = this.movieDetails.asObservable();
  constructor(private http: HttpClient, private router: Router) {
   }
  public getMovies(filterData?: movies){
    if((filterData?.title || filterData?.release_date) && this.mainMovieList.length > 0){
      this.filteredMovieList = [];
      this.filteredMovieList = this.mainMovieList.filter((value: movies) => {
        return this.filterTitle(value?.title, filterData?.title) && this.filterYear(value.release_date, filterData?.release_date);
      })
      this.movieList.next(this.filteredMovieList);
    } else if(this.mainMovieList.length == 0){
      return this.http.get<movies[]>('/movies').pipe(
        map(data => data),
        catchError((error) => throwError(error)),
        finalize(() => {
      })).subscribe((data : movies[])=>{ 
        this.mainMovieList = data;
        this.filteredMovieList = [...data];
        this.movieList.next(data);
      })
    } else {
      return this.movieList.next(this.mainMovieList);
    }
    
  }
  public filterTitle(val: string, filterval:string){
    if(filterval)
    return (val.toLowerCase().includes(filterval.toLowerCase()));

    return true;
  }
  public filterYear(val: string, filterVal: string){
    if(filterVal)
    return (val.substring(0,4).includes(filterVal));

    return true;
  }
  
  public getMovieDetails(id?: string){
    if(id){
      this.movieDetails.next({} as movies);
      return this.http.get<movies>("/movies/"+id).pipe(
        map(data => data),
        catchError((error) => throwError(error)),
        finalize(() => {
      }) 
      ).subscribe((data: movies) => {
        if(data)
        this.movieDetails.next(data);
        else
        this.router.navigate(["/movie-listings"]);
      })
    }
    return "";
  }
}
