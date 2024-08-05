import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './root/login/login.component';
import { authGuard } from './auth/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { PrayersPanelComponent } from './pages/prayers/prayers-panel/prayers-panel.component';
import { SynagoguePanelComponent } from './pages/synagogue/synagogue-panel/synagogue-panel.component';
import { DonersComponent } from './pages/doners/doners.component';
import { BalanceTableComponent } from './pages/prayers/balance-table/balance-table.component';
import { SynagogueBalanceComponent } from './pages/synagogue/synagogue-balance/synagogue-balance.component';
import { SynagogueTansactionComponent } from './pages/synagogue/synagogue-tansaction/synagogue-tansaction.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'prayers-panel', component: PrayersPanelComponent, canActivate: [authGuard] },
  { path: 'synagogue-panel', component: SynagoguePanelComponent, canActivate: [authGuard] },
  { path: 'doners', component: DonersComponent, canActivate: [authGuard] },
  { path: 'balance-table', component: BalanceTableComponent, canActivate: [authGuard] },
  { path: 'synagogue-balance', component: SynagogueBalanceComponent, canActivate: [authGuard] },
  { path: 'synagogue-balance/:id', component: SynagogueTansactionComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
