import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListingsComponent } from './movie-listings.component';

describe('MovieListingsComponent', () => {
  let component: MovieListingsComponent;
  let fixture: ComponentFixture<MovieListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieListingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
