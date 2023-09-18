import { Component, Input, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
    // we declare variable as an object of type any
  // this variable will keep user info from API call (look getUser())
  /**
   * This variables will receive and keep info from API calls bellow
   * @user - keeps info about specific user
   * @movies - keeps array of JSON objects (all movie avaliable in database)
   * @favorites - keeps array of favorite movies of specific user
   */
  user: any = {};
  movies: any[] = [];
  favorites: any[] = [];

  /**
   * The updatedUser object will then be passed into the API call in the registerUser function.
   * @userData object contains: @Username (required), @Password (required), @Email (required), @Birthday (optional)
   */
  @Input() updateUser = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  /**
   * Constructor arguments then will be avaliable through "this" method
   * @param fetchApiData to use functions to make API call
   * @param router to navigate the user to welcome screen after deleting account
   * @param snackBar to show the message, that user has successfuly loged in
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public router: Router
    ) { }

  /**
   * This function calls specified methods automatically straight after Component was mounted
   */

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * This function makes an API call to get User info from database
   * @function getUser
   * @returns JSON object with user information
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.updateUser.Username = resp.Username;
      this.updateUser.Email = resp.Email;
      this.updateUser.Birthday = resp.Birthday;
      return this.user;
    });
  }

  /**
   * This function makes an API call to delete user data for the user that is logged in, redirects user to the welcome view
   * @function deleteUser
   */
  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your account has been deleted!', 'OK', {
          duration: 2000
        });
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        localStorage.clear();
      })
    }
  }

  /**
   * This function makes an API call to update user data, such as username, password, email, or birthday
   * @function updateUserInfo
   */
  updateUserData(): void {
    this.fetchApiData.updateUser(this.updateUser).subscribe((result) => {
      this.snackBar.open('Your profile has been updated!', 'OK', {
        duration: 2000
      });
      localStorage.setItem('username', result.Username);
      window.location.reload();
    });
  }
}
