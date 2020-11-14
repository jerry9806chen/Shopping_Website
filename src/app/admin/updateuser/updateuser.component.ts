import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/entities/user/user.service';
import { IUser, User } from 'src/app/entities/user/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  userForm: FormGroup;
  username: string = '';
  password: string = '';
  //price: number = 0;
  @Input() userToUpdate: IUser = null;
  @Output() updatedUser = new EventEmitter<IUser>();
  error: boolean = false;

  constructor(protected userService: UserService) { }

  // Load all the users when starting the view.
  ngOnInit(): void {
    this.initForm();
    console.log(this.userToUpdate)
    /*this.userForm.value['name'] = this.userToUpdate.name;
    this.userForm.value['brand'] = this.userToUpdate.brand;
    this.userForm.value['price'] = this.userToUpdate.price;*/
  }

  // Manage the submit action and create the new user.
  onSubmit() {
    const user = new User(this.userForm.value['username'], this.userForm.value['password'], [],[], this.userToUpdate._id);
    this.userService.update(user, this.userToUpdate._id).then((result: IUser) => {
      if (result === undefined) {
        this.error = true;
      } else {
        this.error = false;
        this.updatedUser.emit(result);
      }
    });
  }

  // Hide the error message.
  hideError() {
    this.error = false;
  }

  // Init the creation form.
  private initForm() {
    this.userForm = new FormGroup({
      username: new FormControl(this.username, Validators.required),
      password: new FormControl(this.password, Validators.required),
      //price: new FormControl(this.price, Validators.required)
    });
  }

}
