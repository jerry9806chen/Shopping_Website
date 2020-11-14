import { IProduct, Product } from '../product/product.model'

export interface IUser {
  addToWishlist(_id: string): void;
  removeFromCart(_id: string): void;
  _id?: string;
  username: string;
  password: string;
  cart?: Array<string>;
  wishlist?: Array<string>;
}

export class User implements IUser {
  constructor(
    public username: string,
    public password: string,
    public cart?: Array<string>,
    public wishlist?: Array<string>,
    public _id?: string
  ) {
    this._id = _id ? _id : null;
    this.username = username;
    this.password = password;
    this.cart = cart ? cart : [];
    this.wishlist = wishlist ? wishlist : [];
  }

  addToCart(productId: string) {
    this.cart.push(productId)
  }

  addToWishlist(productId: string) {
    this.wishlist.push(productId)
  }

  removeFromCart(productId: string) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i] === productId) {
        this.cart.splice(i,1)
        return;
      }
    }
  }
}