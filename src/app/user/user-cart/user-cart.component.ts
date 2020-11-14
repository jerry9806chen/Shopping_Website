import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/entities/user/user.service';
import { ProductService } from 'src/app/entities/product/product.service';
import { IProduct, Product } from 'src/app/entities/product/product.model';
import { IUser, User } from 'src/app/entities/user/user.model';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit, OnChanges {

  @Input() user: User = null;
  @Output() checkout = new EventEmitter<boolean>();
  cartStrings: Array<string> = null;
  cartItems: Array<IProduct> = null;
  total: number = 0;

  constructor(public userService: UserService, public productService: ProductService) { }

  ngOnInit(): void {
    console.log(this.user.cart)
    this.loadAll();
  }

  ngOnChanges(): void {
    if (this.cartStrings !== null && this.cartStrings.length > 0) {
      console.log('changes called')
      this.loadAll();
    }
  }

  // Load all products.
  private loadAll() {
    this.cartStrings = this.user.cart;
    this.cartItems = [];
    this.total = 0;

    for (let i = 0; i < this.cartStrings.length; i++) {
      this.productService
        .getOne(new Product(null, null, null, this.cartStrings[i]))
        .then((result: IProduct) => {
          this.cartItems.push(result);
          if (typeof result.price === "number")
            this.total += result.price;
          else if (typeof result.price === "string") {
            try{
              this.total += parseFloat(result.price)
            } catch (e) {
              
            }
          }
        });
    }
    this.total = Math.round(this.total * 100) / 100; //console.log('implement loadAll for the user cart')
    console.log(Math.round(this.total * 100))
    console.log(Math.round(this.total * 100) / 100)
  }

  // Move product to wish list.
  moveToWishlist(product: IProduct) {
    console.log('implement moveToWishList')
    console.log(this.user)
    this.user.wishlist.push(product._id)
    this.removeFromCart(product)
  }

  // Remove product from cart.
  removeFromCart(product: IProduct) {
    console.log('implement removeFromCart')
    console.log(product)
    console.log(this.user)
    for (let i = 0; i < this.user.cart.length; i++) {
      if (this.user.cart[i] === product._id) {
        this.user.cart.splice(i,1)
        console.log('found')
        break;
      }
    }
    this.userService.updateCartAndWishlist(this.user);
    this.loadAll()
  }

  checkoutMessage() {
    this.checkout.emit(true)
  }
}
