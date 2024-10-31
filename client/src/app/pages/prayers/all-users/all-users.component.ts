import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserType } from '../../../../../../shared/schemas/userSchema';
import { selectAllUsers } from '../../../store/slices/usersSlice/usersSlice.selector';
import { AppStore } from './../../../store/store';
import { UsersService } from '../services/users.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import { deleteUserStore } from '../../../store/slices/usersSlice/usersSlice.actions';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.scss'
})
export class AllUsersComponent {
  constructor( private store: Store<AppStore>,
    private userService: UsersService,
    private snackBar: SnackBarService
  ){
    

  }
  loading: boolean = false;
  userId: string = ''
  users$: Observable<UserType[]> = this.store.pipe(select(selectAllUsers));
  
  async onSubmit(userId: string) {
    this.loading = true;

    try {
      const delUser = await this.userService.deleteUser(userId);
      this.store.dispatch(deleteUserStore({userId: userId}))
      this.snackBar.openSnackBar("נמחק בהצלחה", 'x');
    } catch (error) {
      console.error(error);
      this.snackBar.openSnackBar("Error occurred", 'x');
    } finally {
      this.loading = false;
    }
  }

}
