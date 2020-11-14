import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StatusService } from './shared/status.service';
import { IProduct } from './entities/product/product.model';
import { IUser } from './entities/user/user.model';
import { IAdmin } from './entities/admin/admin.model';
import { isPromise } from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'node-express-angular';
  status = 'DOWN';
  product: IProduct = null;
  addedProduct: IProduct = null;
  user: IUser = null;
  productToUpdate: IProduct = null;
  userToUpdate: IUser = null;
  modes: Array<string> = ['home','adminSignIn','addItem','updateItems','addUser','updateUser','userReg','userSignIn','catalogCheck','cartCheck','wishList','checkout'];
  private mode: string = this.modes[0];
  loggedInUser: IUser = null;
  loggedInAdmin: IAdmin = null;

  constructor(protected statusService: StatusService) { }

  // Get the server status when starting the view.
  ngOnInit() {
    this.statusService
      .getStatus()
      .then((result: any) => {
        this.status = result.status;
      });
  }

  setMode(modeNum: number) {
    this.mode = this.modes[modeNum];
    console.log(this.mode)
  }

  // Get the logged in admin.
  onAdminLogin(loggedInAdmin: IAdmin) {
    this.setMode(0);
    this.loggedInAdmin = loggedInAdmin;
    this.loggedInUser = null;
  }

  // Get the logged in user.
  onUserLogin(loggedInUser: IUser) {
    this.setMode(0);
    this.loggedInUser = loggedInUser;
    this.loggedInAdmin = null;
  }

  // Go to user registration.
  onRegisteringUser() {
    this.setMode(6);
  }
  /*onRegisteringUser(registeringUser: IUser) {
    this.mode = this.modes[6];
  }*/

  // Get the new product created.
  onCreatedProduct(product: IProduct) {
    this.product = product;
  }

  // Prepare to update a product.
  onUpdatingProduct(productToUpdate: IProduct) {
    this.setMode(3);
    this.productToUpdate = productToUpdate;
  }

  // Get the updated product.
  onUpdatedProduct(updatedProduct: IProduct) {
    this.setMode(2);
    this.product = updatedProduct;
  }

  // Get the new user created.
  onCreatedUser(createdUser: IUser) {
    if (this.mode == this.modes[6])
      this.setMode(0);
    this.user = createdUser;
  }

  // Prepare to update a user.
  onUpdatingUser(userToUpdate: IUser) {
    this.setMode(5);
    this.userToUpdate = userToUpdate;
  }

  // Get the updated user.
  onUpdatedUser(updatedUser: IUser) {
    this.user = updatedUser;
  }

  // Get the product added to the user's cart.
  onProductAddedToCart(addedProduct: IProduct) {
    this.addedProduct = addedProduct;
    this.user.cart.push(addedProduct._id);
  }

  onCheckout(checkout: boolean) {
    this.setMode(11)
  }

  isUserLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }

  isAdminLoggedIn(): boolean {
    return this.loggedInAdmin !== null;
  }

  isLoggedIn(): boolean {
    return this.isUserLoggedIn() || this.isAdminLoggedIn();
  }

  getMode(): string {
    return this.mode;
  }

  logout() {
    this.loggedInUser = null;
    this.loggedInAdmin = null;
    this.mode = this.modes[0];
  }
}
