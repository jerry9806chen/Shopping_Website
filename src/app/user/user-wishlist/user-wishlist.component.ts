import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserService } from 'src/app/entities/user/user.service';
import { ProductService } from 'src/app/entities/product/product.service';
import { IProduct, Product } from 'src/app/entities/product/product.model';
import { IUser, User } from 'src/app/entities/user/user.model';

@Component({
  selector: 'app-user-wishlist',
  templateUrl: './user-wishlist.component.html',
  styleUrls: ['./user-wishlist.component.css']
})
export class UserWishlistComponent implements OnInit, OnChanges {

  @Input() user: User = null;
  wishlistStrings: Array<string> = null;
  wishlistItems: Array<IProduct> = null;

  constructor(public userService: UserService, public productService: ProductService) { }

  ngOnInit(): void {
    console.log(this.user.wishlist)
    this.loadAll(); //console.log(this.wishlistItems.length)
  }

  ngOnChanges(): void {
    if(this.wishlistItems !== null && this.wishlistStrings.length > 0) {
      console.log('changes called')
      this.loadAll(); //console.log(this.wishlistItems.length)
    }
  }

  // Load all products.
  private loadAll() {
    this.wishlistStrings = this.user.wishlist;
    this.wishlistItems = [];

    for (let i = 0; i < this.wishlistStrings.length; i++) {
      this.productService
        .getOne(new Product(null, null, null, this.wishlistStrings[i]))
        .then((result: IProduct) => {
          //this.wishlistItems.push(result);
          if (result !== undefined && result !== null) {
            console.log('valid item')
            this.wishlistItems.push(result);
          } else {
            console.log('invalid item');
            this.wishlistItems.push(new Product(null, null, null, this.wishlistStrings[i]))
          }
        });
    }
    console.log('implement loadAll for the user wishlist')
  }

  // Move product to cart.
  moveToCart(product: IProduct) {
    console.log('implement moveToCart')
    console.log(this.user)
    this.user.cart.push(product._id)
    this.removeFromWishlist(product)
  }

  // Remove product from wishlist.
  removeFromWishlist(product: IProduct) {
    console.log('implement removeFromWishlist')
    console.log(product)
    console.log(this.user)
    for (let i = 0; i < this.user.wishlist.length; i++) {
      if (this.user.wishlist[i] === product._id) {
        this.user.wishlist.splice(i,1)
        console.log('found')
        break;
      }
    }
    this.userService.updateCartAndWishlist(this.user);
    this.loadAll()
  }
}
