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
  private movieDetails = new BehaviorSubject<movies>({});
  public movieDetails$ = this.movieDetails.asObservable();
  constructor(private http: HttpClient, private router: Router) {
   }
  public getMovies(filterData?: movies){
    if((filterData?.title || filterData?.release_date) && this.mainMovieList.length > 0){
      this.filteredMovieList = [];
      this.filteredMovieList = this.mainMovieList.filter((value: movies) => {
        if(filterData?.title && !filterData?.release_date)
          return (value.title?.toLowerCase().includes(filterData?.title.toLowerCase()));
        else if(!filterData?.title && filterData?.release_date)
          return (value.release_date?.substring(0,4).includes(filterData?.release_date));
        else if(filterData?.title && filterData?.release_date)
          return (value.title?.toLowerCase().includes(filterData?.title.toLowerCase()) && value.release_date?.substring(0,4).includes(filterData?.release_date));
        else
          return value;
      })
      this.movieList.next(this.filteredMovieList);
    } else if(this.mainMovieList.length == 0){
      return this.http.get('/movies').pipe(
        map(data => data),
        catchError((error) => throwError(error)),
        finalize(() => {
        console.log("done")
      })).subscribe((data: any)=>{
        this.mainMovieList = data;
        this.filteredMovieList = [...data]; //JSON.parse(JSON.stringify(data));
        this.movieList.next(data);
      })
    } else {
      return this.movieList.next(this.mainMovieList);
    }
    
  }
  public getMovieDetails(id?: string){
    if(id){
      this.movieDetails.next({});
      return this.http.get("/movies/"+id).pipe(
        map(data => data),
        catchError((error) => throwError(error)),
        finalize(() => {
        console.log("done")
      }) 
      ).subscribe((data: movies) => {
        if(data)
        this.movieDetails.next(data);
        else
        this.router.navigate(["/movies"]);
      })
    }
    return "";
  }
}
