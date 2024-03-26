import { Routes } from '@angular/router';
import { MovieListingsComponent } from './movie-listings/movie-listings.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

export const routes: Routes = [
    {path:'',component:MovieListingsComponent, pathMatch: "full"},
    {path:"movie-listings", component: MovieListingsComponent},
    {path:"movie-details/:id", component: MovieDetailsComponent},
    {path:"**", component: MovieListingsComponent}
];
