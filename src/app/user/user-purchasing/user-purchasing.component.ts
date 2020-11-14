import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserService } from 'src/app/entities/user/user.service';
import { ProductService } from 'src/app/entities/product/product.service';
import { IProduct } from 'src/app/entities/product/product.model';
import { IUser, User } from 'src/app/entities/user/user.model';

@Component({
  selector: 'app-user-purchasing',
  templateUrl: './user-purchasing.component.html',
  styleUrls: ['./user-purchasing.component.css']
})
export class UserPurchasingComponent implements OnInit, OnChanges {

  products: Array<IProduct> = [];
  @Input() productToDisplay: IProduct = null;
  @Input() user: User = null;

  constructor(public userService: UserService, public productService: ProductService) { }

  // Load all the products when starting the view.
  ngOnInit(): void {
    this.loadAll();
  }

  // If new product created, we add it to the list.
  ngOnChanges(): void {
    if (this.productToDisplay !== null) {
      this.products.push(this.productToDisplay);
    }
  }

  // Add an item to the user's cart. 
  addToCart(product: IProduct) {
    console.log("add to cart called.");
    if (!this.user.cart)
      this.user.cart = [];
    this.user.cart.push(product._id);
    this.userService.updateCartAndWishlist(this.user);
  }

  // Add an item to the user's cart. 
  addToWishlist(product: IProduct) {
    console.log("add to wishlist called.");
    if (!this.user.wishlist)
      this.user.wishlist = []
    this.user.wishlist.push(product._id);
    this.userService.updateCartAndWishlist(this.user);
  }

  // Load all products.
  private loadAll() {
    this.productService
      .get()
      .then((result: Array<IProduct>) => {
        this.products = result;
      });

    console.log(this.products)
  }

}
