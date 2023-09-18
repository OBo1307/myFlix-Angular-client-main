import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in the last section
import { UserRegistrationService  } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * The @userData object will then be passed into the API call in the registerUser function.
   * @userData object contains: @Username (required), @Password (required), @Email (required), @Birthday
   */

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Constructor arguments then will be avaliable through "this" method
   * @param FetchApiData to use functions to make API call
   * @param dialogRef to call dialog with login inputs
   * @param snackBar to show the message, that user has successfuly loged in
   */
  constructor(
    public fetchApiData: UserRegistrationService ,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }
  
  // The ngOnInit method is called once the component has received all its inputs
  // (all its data-bound properties) from the calling component (user)
  /**
   * This function calls specified methods automatically straight after Component was mounted
   */
  ngOnInit(): void {
  }

  /**
   * This is the function responsible for sending the form inputs to the backend API
   * @function registerUser
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful user registration goes here! (To be implemented)
      console.log(result);
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('User registration succesful', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open('User registration succesful', 'OK', {
        duration: 2000
      });
    });
  }

}
