import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { UserType } from '../../../../../../shared/schemas/userSchema';
import { SnackBarService } from '../../../services/snack-bar.service';
import { addUserToStore, deleteUserStore } from '../../../store/slices/usersSlice/usersSlice.actions';
import { selectAllUsers } from '../../../store/slices/usersSlice/usersSlice.selector';
import { UsersService } from '../services/users.service';
import { AppStore } from './../../../store/store';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.scss'
})
export class AllUsersComponent implements OnInit {
  constructor(private store: Store<AppStore>,
    private userService: UsersService,
    private snackBar: SnackBarService
  ) {


  }
  loading: boolean = false;
  userId: string = ''
  // users from store
  users$: Observable<UserType[]> = this.store.pipe(select(selectAllUsers));
  private unsubscribe$ = new Subject<void>();
  ngOnInit(): void {
    // Fetch users only if the store is empty
    this.users$.pipe(
      takeUntil(this.unsubscribe$),
      tap(users => {
        if (users.length === 0) {
          this.fetchUsers();
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // Fetch users from API and add them to the store
  private fetchUsers(): void {
    this.loading = true;
    this.userService.getUsers().pipe(
      takeUntil(this.unsubscribe$),
      tap(fetchedUsers => {
        fetchedUsers.forEach(user => {
          this.store.dispatch(addUserToStore({ user }));
        });
        this.loading = false;
      }),
      tap({
        error: () => this.loading = false // Ensure loading is set to false on error
      })
    ).subscribe();
  }


  // delete user
  async onSubmit(userId: string) {
    this.loading = true;

    try {
      const delUser = (await this.userService.deleteUser(userId)).subscribe({
        next: (res: string) => console.log("User deleted:", res)
      })
      this.store.dispatch(deleteUserStore({ userId: userId }))
      this.snackBar.openSnackBar("נמחק בהצלחה", 'x');
    } catch (error) {
      console.error(error);
      this.snackBar.openSnackBar("Error occurred", 'x');
    } finally {
      this.loading = false;
    }
  }

}
