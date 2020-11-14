import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/entities/user/user.service';
import { IUser } from 'src/app/entities/user/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnChanges {

  users: Array<IUser> = [];
  @Input() userToDisplay: IUser = null;
  @Output() userToUpdate = new EventEmitter<IUser>();
  updateUser: boolean;

  constructor(protected userService: UserService) { }

  // Load all the users when starting the view.
  ngOnInit(): void {
    this.loadAll();
  }

  // If new user created, we add it to the list.
  ngOnChanges(): void {
    console.log('on changes called')
    console.log(this.userToDisplay)
    if (this.userToDisplay !== null) {
      //this.users.push(this.userToDisplay);
      this.loadAll();
    }
  }

  // Delete a user. 
  delete(id: string) {
    this.userService.delete(id).then((result: any) => this.loadAll());
  }

  // Update a product.
  update(user: IUser) {
    //this.productService.update(id).then((result:any) => this.loadAll());
    //this.updateItem = true;
    console.log('emitting')
    console.log(user)
    this.userToUpdate.emit(user)
  }

  // Load all users.
  private loadAll() {
    this.userService
      .get()
      .then((result: Array<IUser>) => {
        this.users = result;
      });
  }

}
