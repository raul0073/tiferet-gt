import { Component } from '@angular/core';
import labels from './pages/home/data/home.json';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client';
  header = labels.header
  constructor(public router: Router, public authService: AuthService) {}

  get shouldShowNavigation(): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const isHomePath = this.router.url.includes('/home');
    return isLoggedIn || isHomePath;
  }
}

