import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserService } from 'src/app/entities/user/user.service';
import { IProduct, Product } from 'src/app/entities/product/product.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/entities/user/user.model';
import { ProductService } from 'src/app/entities/product/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  orderForm: FormGroup;
  ccn: number = 0;
  date: string = '';
  pin: number = 0;
  address: string = '';
  city: string = '';
  state: string = '';
  zip: string = '';
  error: boolean = false; success: boolean = false;

  cartStrings: Array<string> = null;
  cartItems: Array<IProduct> = null;
  total: number = 0;

  @Input() user: IUser = null;
  productService: ProductService;

  constructor(protected userService: UserService, protected formBuilder: FormBuilder) { }

  // Hide the error message.
  hideError() {
    this.error = false;
  }

  ngOnInit(): void {
    this.initForm();
    this.loadTotal()
  }

  onSubmit() {
    this.user.cart = []
    this.userService.updateCartAndWishlist(this.user).then((result: IUser) => {
      if (result === undefined) {
        this.error = true;
        this.success = false;
      } else {
        this.error = false;
        this.success = true;
      }
    });
  }

  private loadTotal() {
    this.cartStrings = this.user.cart;
    this.cartItems = [];

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
    console.log('implement loadAll for the user cart')
  }

  // Init the creation form.
  private initForm() {
    this.orderForm = new FormGroup({
      ccn: new FormControl(this.ccn, Validators.required),
      date: new FormControl(this.date, Validators.required),
      pin: new FormControl(this.pin, Validators.required),
      address: new FormControl(this.address, Validators.required),
      city: new FormControl(this.city, Validators.required),
      state: new FormControl(this.state, Validators.required),
      zip: new FormControl(this.zip, Validators.required),
    });
  }

}
