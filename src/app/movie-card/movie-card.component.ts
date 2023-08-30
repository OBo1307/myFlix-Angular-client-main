import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';

import { GenreDetailsComponent } from '../genre-details/genre-details.component';
import { DirectorDetailsComponent } from '../director-details/director-details.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  /**
   * This variables will receive and keep info from API calls below
   * @movies - keeps array of JSON objects (all movie available in database)
   * @favorites - keeps array of favorite movies of specific user
   */
  movies: any[] = [];
  favorites: any[] = [];

  /**
   * @constructor is used to set dependencies. Constructor arguments then will be avaliable through "this" method
   * @param fetchApiData to use functions to make API call
   * @param dialog to call dialog with Genre, Director or Synopsis details
   * @param snackBar to show the message, that function succeded or throw error
   */

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) { }
  
  // After implementing the function getMovies it is being called ngOnInit lifecycle hook
  // ngOnInit is called when Angular is done creating the component
  /**
   * This function calls specified methods automatically straight after Component was mounted
   * @function getMovies is called straight after component was mounted
   * @function getFavoriteMovies is called straight after component was mounted
   */ 

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * This function makes API call to get favorite movies of specific user
   * @function getFavoriteMovies
   * @returns array with movies id, which are included to the list of favorites
   */

  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      console.log(this.favorites);
      return this.favorites;
    });
  }

    /**
   * This function checks if movie is included to the list of favorites for specific user
   * @function isFavorite
   * @param id type of string - id of specific movie
   * @returns type of booleans (true or false)
   */

  isFavorite(id: string): boolean {
    return this.favorites.includes(id);
  }

    /**
   * This function makes API call to add the movie to the list of favorite for specific user
   * @function addToFavorites
   * @param id type of string - id of specific movie
   */

  addToFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.addMovieToFavorites(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
  }

    /**
   * This function makes API call to delete the movie from the list of favorite for specific user
   * @function deleteFromFavorites
   * @param id type of string - id of specific movie
   */

  deleteFromFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.deleteMovieFromFavorites(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie deleted from favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

    /**
   * This function ma kes API call to get the full list of movies
   * @function getMovies
   * @returns array of JSON objects of all movies
   */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

    /**
   * This function opens dialog with detailed information about specific Genre
   * @param name of specific Genre (comes from specific movie card)
   * @param description of specific Genre (comes from specific movie card)
   */

  openGenreDetails(name: string, description: string): void {
    console.log(name);
    this.dialog.open(GenreDetailsComponent, {
      data: {
        Name: name,
        Description: description,
      },
    });
  }

    /**
   * This function opens dialog with detailed information about specific Director
   * @param name of specific Director (comes from specific movie card)
   * @param bio of specific Director (comes from specific movie card)
   * @param birth of specific Director (comes from specific movie card)
   */

  openDirectorDetails(name: string, bio: string, birth: string): void {
    console.log(name);
    this.dialog.open(DirectorDetailsComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
    });
  }

    /**
   * his function opens dialog with detailed information about specific Movie
   * @param title of specific Movie (comes from specific movie card)
   * @param movieDirector of specific Movie (comes from specific movie card)
   * @param movieGenre of specific Movie (comes from specific movie card)
   * @param movieDescription of specific Movie (comes from specific movie card)
   * @param movieImagePath of specific Movie (comes from specific movie card)
   */

  openMovieSynopsis(
    title: string,
    movieDirector: string,
    movieGenre: string,
    movieDescription: string,
    movieImagePath: string
  ): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: {
        Title: title,
        Director: movieDirector,
        Genre: movieGenre,
        Description: movieDescription,
        Image: movieImagePath,
      },
    });
  }
}
