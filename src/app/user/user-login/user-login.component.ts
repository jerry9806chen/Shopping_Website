import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/entities/user/user.service';
import { IUser, User } from 'src/app/entities/user/user.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userLoginForm: FormGroup;
  username: string = '';
  password: string = '';
  error: boolean = false;
  userRegForm: FormGroup;
  regUser: boolean = false;

  @Output() loggedInUser = new EventEmitter<IUser>();
  //@Output() registeringUser = new EventEmitter<IUser>();

  constructor(protected userService: UserService, protected formBuilder: FormBuilder) { }

  // Init the form when starting the view.
  ngOnInit(): void {
    this.initForm();
  }

  // Manage the submit action and create the new user.
  onSubmit() {
    console.log('submitted')
    const user = new User(this.userLoginForm.value['username'], this.userLoginForm.value['password'], null);
    this.userService.validateUser(user).then((result: IUser) => {
      /*console.log(result)
      console.log(result.username)
      console.log(result.password)*/
      if (result === undefined || result === null || !result.username || !result.password) {
        console.log(result)
        console.log('we got a problem')
        this.error = true;
      } else {
        console.log('all good')
        this.error = false;
        this.loggedInUser.emit(result);
      }
    });
  }

  // Register a user.
  onRegister() {
    this.regUser = true;
  }

  // Hide the error message.
  hideError() {
    this.error = false;
  }

  // Init the creation form.
  private initForm() {
    this.userLoginForm = new FormGroup({
      username: new FormControl(this.username, Validators.required),
      password: new FormControl(this.password, Validators.required)
    });
  }
  
}
