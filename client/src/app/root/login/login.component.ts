import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ZodError } from 'zod';
import { ILogin } from '../../../../../shared/schemas/loginSchema';
import { IUser } from '../../../../../shared/schemas/userSchema';
import labels from '../../../Data/Labels/login.json';
import { AuthService } from '../../services/auth.service';
import { LoginService } from '../../services/login.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { setCurrentUser } from '../../store/slices/usersSlice/usersSlice.actions';
import { AppStore } from '../../store/store';
import { loginSchema } from './../../../../../shared/schemas/loginSchema';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  users: IUser[] = [];
  loading: boolean = false;
  userEmail: string =''
  userPassword: string =''
  errorMessages: { [key: string]: string } = {};
  // HTML labels
  headerText = labels.header;
  subHeaderTxt = labels.subHeader;
  emailLabel = labels.email;
  passLabel = labels.password;
  btnText = labels.btnSubmit;
  forgotTxt = labels.forgot;

  constructor(
    private loginService: LoginService,
    private snackBarService: SnackBarService,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppStore> 
  ) {}


  // Function to log in user by email and password
  onSubmit() {
    this.errorMessages = {}; // Clear previous error messages
    this.loading = true;

    const userObj: ILogin = { email: this.userEmail, password: this.userPassword };

    try {
        // Validate userObj with the schema
        loginSchema.parse(userObj);

        // Call the login service and handle the response
        this.loginService.loginUser(userObj).subscribe({
            next: (data: any) => {
                this.store.dispatch(setCurrentUser({ user: data.user }))
            },
            error: (error) => {
                if (error instanceof ZodError) {
                    this.updateErrorMessages(error.errors);
                } else {
                    this.snackBarService.openSnackBar(error.error.msg, 'X');
                }
                
            },
            complete: () => {
                this.loading = false;
                this.authService.login();
                this.router.navigate(['/home']);
            }
        });
    } catch (error) {
        if (error instanceof ZodError) {
            this.updateErrorMessages(error.errors);
        } else {
            this.snackBarService.openSnackBar('Login failed: ' + error, 'X');
        }

    }finally{
      this.loading = false;
    }
}


  private updateErrorMessages(errors: any[]) {
    errors.forEach(error => {
      const { path, message } = error;
      if (path.length > 0) {
        const key = path[0]; 
        this.errorMessages[key] = message;
      }
    });
  }
}