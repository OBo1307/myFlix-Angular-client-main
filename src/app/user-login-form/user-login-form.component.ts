import { Component, OnInit, Input } from '@angular/core';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
// This import brings in the API calls we created earlier
import { UserRegistrationService } from '../fetch-api-data.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  // The userData object will then be passed into the API call in the userLogin function.
  /**
   * The @loginData object will then be passed into the API call in the registerUser function.
   * @loginrData object contains: @Username (required), @Password (required)
   */

  @Input() loginData = { Username: '', Password: '' };

  /**
   * @constructor is used to set dependencies. Constructor arguments then will be avaliable through "this" method
   * @param dialogRef to call dialog with login inputs
   * @param FetchApiData to use functions to make API call
   * @param router to navigate the user to welcome MovieCard after logging in
   * @param snackBar to show the message, that user has successfuly loged in
   */
  constructor(
    public FetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }
  
  /**
   * This function calls specified methods automatically straight after Component was mounted
   */
  ngOnInit(): void {
  }
    /**
   * This is the function responsible for sending the form inputs to the backend API to login user
   * @function registerUser
   * If success, set the localstorage with user and token
   * if fails, snakBar shows error message
   */
  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.FetchApiData.userLogin(this.loginData).subscribe({
      next: (result) => {
        localStorage.setItem('username', result.user.Username);
        localStorage.setItem('token', result.token);
        this.dialogRef.close(); // This will close the modal on success!
        this.router.navigate(['movies']);
        // informs user that login was successful
        this.snackBar.open('User logged in succesfully!', 'OK', {
          duration: 4000,
        });
      },
      error: (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 4000,
        });
        console.log(result);
      },
    });
  }
}
