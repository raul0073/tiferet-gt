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
import { SynagogueAddTransactionComponent } from './pages/synagogue/synagogue-add-transaction/synagogue-add-transaction.component';
import { AddOrderComponent } from './pages/prayers/add-order/add-order.component';
import { OverallTableComponent } from './pages/prayers/overall-table/overall-table.component';
import { AddUserComponent } from './pages/prayers/add-user/add-user.component';
import { CustomPrintsComponent } from './pages/prayers/custom-prints/custom-prints.component';
import { AllUsersComponent } from './pages/prayers/all-users/all-users.component';
import { UserDetailedComponent } from './pages/prayers/user-detailed/user-detailed.component';
import { PrintBalanceTableComponent } from './pages/prayers/custom-prints/pages/print-balance-table/print-balance-table.component';
import { PrintAliyotComponent } from './pages/prayers/custom-prints/pages/print-aliyot/print-aliyot.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'prayers-panel', component: PrayersPanelComponent, canActivate: [authGuard] },
  { path: 'synagogue-panel', component: SynagoguePanelComponent, canActivate: [authGuard] },
  { path: 'doners', component: DonersComponent, canActivate: [authGuard] },
  { path: 'prayers/balance-table', component: BalanceTableComponent, canActivate: [authGuard] },
  { path: 'synagogue-balance', component: SynagogueBalanceComponent, canActivate: [authGuard] },
  { path: 'synagogue-balance/:id', component: SynagogueTansactionComponent, canActivate: [authGuard] },
  { path: 'synagogue/add', component: SynagogueAddTransactionComponent, canActivate: [authGuard] },
  { path: 'prayers/order/add', component: AddOrderComponent, canActivate: [authGuard] },
  { path: 'prayers/overall-table', component: OverallTableComponent},
  { path: 'prayers/overall-table/:id', component: UserDetailedComponent},
  { path: 'prayers/add', component: AddUserComponent, canActivate: [authGuard] },
  { path: 'prayers/custom-prints', component: CustomPrintsComponent, canActivate: [authGuard] },
  { path: 'prayers/all', component: AllUsersComponent, canActivate: [authGuard] },
  { path: 'prayers/custom-prints/print-balance', component: PrintBalanceTableComponent },
  { path: 'prayers/custom-prints/print-aliyot', component: PrintAliyotComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
