import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieListingsComponent } from './movie-listings/movie-listings.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MovieListingsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'harry-potter-movies';
}
