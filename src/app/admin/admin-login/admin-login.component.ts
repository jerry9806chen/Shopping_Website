import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdminService } from 'src/app/entities/admin/admin.service';
import { IAdmin, Admin } from 'src/app/entities/admin/admin.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  adminLoginForm: FormGroup;
  username: string = '';
  password: string = '';
  error: boolean = false;

  @Output() loggedInAdmin = new EventEmitter<IAdmin>();

  constructor(protected adminService: AdminService, protected formBuilder: FormBuilder) { }

  // Init the form when starting the view.
  ngOnInit(): void {
    this.initForm();
  }

  // Manage the submit action and create the new user.
  onSubmit() {
    const admin = new Admin(this.adminLoginForm.value['username'], this.adminLoginForm.value['password'], null);
    this.adminService.validate(admin).then((result: IAdmin) => {
      if (result === undefined || result === null || !result.username || !result.password) {
        console.log('we got a problem')
        this.error = true;
      } else {
        console.log('all good')
        this.error = false;
        this.loggedInAdmin.emit(result);
      }
    });
  }

  // Hide the error message.
  hideError() {
    this.error = false;
  }

  // Init the creation form.
  private initForm() {
    this.adminLoginForm = new FormGroup({
      username: new FormControl(this.username, Validators.required),
      password: new FormControl(this.password, Validators.required)
    });
  }

}
