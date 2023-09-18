import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-director-details',
  templateUrl: './director-details.component.html',
  styleUrls: ['./director-details.component.scss'],
})
export class DirectorDetailsComponent implements OnInit {
    /**
   * 
   * @param fetchApiData to use functions to make API call
   * @param data specific Director data
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birth: string
    }
  ) {}
  /**
   * This function calls specifiec methods automatically straight after Component was mounted
   */
  ngOnInit(): void {}
}