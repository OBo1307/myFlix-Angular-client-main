import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WelcomePageComponent } from '../welcome-page/welcome-page.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  /**
   * @constructor is used to set dependencies. Constructor arguments then will be avaliable through "this" method
   * @param router to navigate the user to welcome MovieCard after logging in
   */
  constructor(public router: Router) { }

  /**
   * This function calls specified methods automatically straight after Component was mounted
   */
  ngOnInit(): void {}

  /**
   * This function navigates to movies list, URL ends with 'movies'
   * @function allMovies
   */

  allMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * This function navigates to user profile page, URL ends with 'profile'
   * @function userProfile
   */

  userProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * This function navigates to welcome page, URL ends with 'welcome'
   * @function logout
   */

  logout(): void {
    this.router.navigate(['welcome']);
  }
}
