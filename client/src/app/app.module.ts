import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
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
    StoreModule.forRoot({ users: usersReducer }) 
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
