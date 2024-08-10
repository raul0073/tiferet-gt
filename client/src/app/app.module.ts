import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingButtonComponent } from './components/buttons/loading-button/loading-button.component';
import { MaterialModule } from './material.module';
import { LoginComponent } from './root/login/login.component';
import { LogoComponent } from './root/logo/logo.component';
import { HeaderComponent } from './components/headers/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { StoreModule } from '@ngrx/store';
import { usersReducer } from './store/slices/usersSlice/userSlice.reducer';
import { NavigationComponent } from './components/nabvar/navigation/navigation.component';
import { ButtonWithIconComponent } from './components/buttons/button-with-icon/button-with-icon.component';
import { PrayersPanelComponent } from './pages/prayers/prayers-panel/prayers-panel.component';
import { SynagoguePanelComponent } from './pages/synagogue/synagogue-panel/synagogue-panel.component';
import { DonersComponent } from './pages/doners/doners.component';
import { TableComponent } from './components/table/table.component';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeHe from '@angular/common/locales/he';
import { SubHeaderComponent } from './components/headers/sub-header/sub-header.component';
import { BalanceTableComponent } from './pages/prayers/balance-table/balance-table.component';
import { SynagogueBalanceComponent } from './pages/synagogue/synagogue-balance/synagogue-balance.component';
import { DeleteButtonWithIconComponent } from './components/buttons/delete-button-with-icon/delete-button-with-icon.component';
import { SynagogueAddTransactionComponent } from './pages/synagogue/synagogue-add-transaction/synagogue-add-transaction.component';
import { SynagogueTansactionComponent } from './pages/synagogue/synagogue-tansaction/synagogue-tansaction.component';
import { AddDonerComponent } from './pages/doners/components/add-doner/add-doner.component';
import { AddOrderComponent } from './pages/prayers/add-order/add-order.component';
import { OverallTableComponent } from './pages/prayers/overall-table/overall-table.component';
import { AddUserComponent } from './pages/prayers/add-user/add-user.component';
import { CustomPrintsComponent } from './pages/prayers/custom-prints/custom-prints.component';
import { FooterComponent } from './components/footer/footer.component';
import { LatestActionsComponent } from './pages/home/latest-actions/latest-actions.component';
import { AllUsersComponent } from './pages/prayers/all-users/all-users.component';
import { balanceReducer } from './store/slices/balanceSlice/balance.reducer';
import { FormHeaderComponent } from './components/headers/form-header/form-header.component';
import { UserDetailedComponent } from './pages/prayers/user-detailed/user-detailed.component';
import { ConfirmDialogComponent } from './components/buttons/delete-button-with-icon/confirm-dialog/confirm-dialog.component';
import { PrintBalanceTableComponent } from './pages/prayers/custom-prints/pages/print-balance-table/print-balance-table.component';
import { PrintAliyotComponent } from './pages/prayers/custom-prints/pages/print-aliyot/print-aliyot.component';




registerLocaleData(localeHe);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingButtonComponent,
    LogoComponent,
    HeaderComponent,
    HomeComponent,
    NavigationComponent,
    ButtonWithIconComponent,
    PrayersPanelComponent,
    SynagoguePanelComponent,
    DonersComponent,
    TableComponent,
    SubHeaderComponent,
    BalanceTableComponent,
    SynagogueBalanceComponent,
    SynagogueTansactionComponent,
    DeleteButtonWithIconComponent,
    SynagogueAddTransactionComponent,
    AddDonerComponent,
    AddOrderComponent,
    OverallTableComponent,
    AddUserComponent,
    CustomPrintsComponent,
    FooterComponent,
    LatestActionsComponent,
    AllUsersComponent,
    FormHeaderComponent,
    UserDetailedComponent,
    ConfirmDialogComponent,
    PrintBalanceTableComponent,
    PrintAliyotComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterOutlet,
    CommonModule,
    StoreModule.forRoot({ users: usersReducer,
                          balance: balanceReducer
     }) 
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'he-IL' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
