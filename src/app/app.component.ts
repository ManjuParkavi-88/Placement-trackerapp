import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = '';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Navigated to:', event.url);
        if (event.url.includes('login')) this.pageTitle = 'Login Page';
        else if (event.url.includes('register')) this.pageTitle = 'Register Page';
        else this.pageTitle = 'Placement Tracker';
      }
    });
  }
}
