import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/entities/user/user.service';
import { IUser, User } from 'src/app/entities/user/user.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  userForm: FormGroup;
  username: string = '';
  password: string = '';
  error: boolean = false;
  success: boolean = false;

  @Output() user = new EventEmitter<IUser>();

  constructor(protected userService: UserService, protected formBuilder: FormBuilder) { }

  // Init the form when starting the view.
  ngOnInit(): void {
    this.initForm();
  }

  // Manage the submit action and create the new user.
  onSubmit() {
    const user = new User(this.userForm.value['username'], this.userForm.value['password'], null);
    this.username = user.username;
    this.userService.create(user).then((result: IUser) => {
      if (result === undefined) {
        this.error = true;
        this.success = false;
      } else {
        this.error = false;
        this.success = true;
        this.user.emit(result);
      }
    });
  }

  // Hide the error message.
  hideError() {
    this.error = false;
  }

  // Hide the success message.
  hideSuccess() {
    this.success = false;
  }

  // Init the creation form.
  private initForm() {
    this.userForm = new FormGroup({
      username: new FormControl(this.username, Validators.required),
      password: new FormControl(this.password, Validators.required)
    });
  }

}
