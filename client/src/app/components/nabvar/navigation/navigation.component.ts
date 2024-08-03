import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  constructor(private authService: AuthService,
    public router: Router,
    private location: Location
  ) { }
    isHomePage: boolean = this.router.url.includes('home')
  
  goBack(){
    this.location.back()
  }
  onLogout() {
    this.authService.logout()
    return this.router.navigate(['/'])
  }
}
