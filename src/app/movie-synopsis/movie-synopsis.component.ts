import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-synopsis',
  templateUrl: './movie-synopsis.component.html',
  styleUrls: ['./movie-synopsis.component.scss'],
})
export class MovieSynopsisComponent implements OnInit {
  /**
   * @constructor is used to set dependencies. Constructor arguments then will be avaliable through "this" method
   * @param fetchApiData to use functions to make API call (service)
   * @param data specific movie data, received through @MAT_DIALOG_DATA from MovieCard
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Director: string;
      Genre: string;
      Description: string;
      Image: string;
    }
  ) {}

  /**
   * This function calls specified methods automatically straight after Component was mounted
   */
  ngOnInit(): void {}
}