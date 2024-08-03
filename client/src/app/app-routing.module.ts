import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './root/login/login.component';
import { authGuard } from './auth/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { PrayersPanelComponent } from './pages/prayers/prayers-panel/prayers-panel.component';
import { SynagoguePanelComponent } from './pages/synagogue/synagogue-panel/synagogue-panel.component';
import { DonersComponent } from './pages/doners/doners.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'prayers-panel', component: PrayersPanelComponent, canActivate: [authGuard] },
  { path: 'synagogue-panel', component: SynagoguePanelComponent, canActivate: [authGuard] },
  { path: 'doners', component: DonersComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
