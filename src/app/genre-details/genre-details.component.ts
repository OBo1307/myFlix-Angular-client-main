import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-genre-details',
  templateUrl: './genre-details.component.html',
  styleUrls: ['./genre-details.component.scss'],
})
export class GenreDetailsComponent implements OnInit {
  /**
   * 
   * @param fetchApiData to use functions to make API call
   * @param data specific Genre data, received through @MAT_DIALOG_DATA from MovieCard
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Description: string;
    }
  ) {}
  /**
   * This function calls specified methods automatically straight after Component was mounted
   */
  ngOnInit(): void {

  }
}