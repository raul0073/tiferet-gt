import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  screen: number = 0;
  scrolled: boolean = false;
  isHomePage: boolean = this.router.url.includes('home');

  constructor(
    private authService: AuthService,
    public router: Router,
    private location: Location
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.screen = window.scrollY;
    this.scrolled = this.screen > 140;
  }

  goBack() {
    this.location.back();
  }

  onLogout() {
    this.authService.logout();
    return this.router.navigate(['/']);
  }

  
}