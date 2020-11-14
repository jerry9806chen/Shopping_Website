import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/entities/user/user.service';
import { IUser, User } from 'src/app/entities/user/user.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  userRegistrationForm: FormGroup;
  username: string = '';
  password: string = '';
  error: boolean = false;
  chooseDifferentUsername: boolean = false;
  success: boolean = false;

  @Output() loggedInUser = new EventEmitter<IUser>();

  constructor(protected userService: UserService, protected formBuilder: FormBuilder) { }

  // Init the form when starting the view.
  ngOnInit(): void {
    this.initForm();
  }

  // Manage the submit action and create the new user.
  onSubmit() {//console.log('submitted');
    const user = new User(this.userRegistrationForm.value['username'], this.userRegistrationForm.value['password'], null); //console.log(user)
    this.chooseDifferentUsername = false;
    this.success = false;
    this.error = false;
    this.userService.getOne(user).then((result1) => {
      if (result1 === undefined) {//console.log(true)
        this.userService.create(user).then((result: IUser) => {//console.log(result)
          if (result === undefined || !result.username || !result.password || !result._id) {
            console.log('we got a problem')
            this.error = true;
          } else {
            console.log('all good')
            this.error = false;
            this.success = true;
            this.loggedInUser.emit(result);
          }
        });
      } else {
        console.log(false)
        this.chooseDifferentUsername = true;
      }
    });
  }

  // Hide the error message.
  hideError() {
    this.error = false;
  }

  // Init the creation form.
  private initForm() {
    this.userRegistrationForm = new FormGroup({
      username: new FormControl(this.username, Validators.required),
      password: new FormControl(this.password, Validators.required)
    });
  }

}
