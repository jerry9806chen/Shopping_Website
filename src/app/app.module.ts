import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Compiler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserPurchasingComponent } from './user/user-purchasing/user-purchasing.component';
import { UserCartComponent } from './user/user-cart/user-cart.component';
import { UserWishlistComponent } from './user/user-wishlist/user-wishlist.component';
//import { AdduserComponent } from './admin/adduser/adduser.component';
import { UpdateuserComponent } from './admin/updateuser/updateuser.component';
import { DeleteuserComponent } from './admin/deleteuser/deleteuser.component';
//import { DeleteitemComponent } from './admin/deleteitem/deleteitem.component';
import { UpdateitemComponent } from './admin/updateitem/updateitem.component';
//import { AdditemComponent } from './admin/additem/additem.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { UserCreateComponent } from './admin/user-create/user-create.component';
import { CheckoutComponent } from './product/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCreateComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    UserPurchasingComponent,
    UserCartComponent,
    UserWishlistComponent,
    //AdduserComponent,
    UpdateuserComponent,
    DeleteuserComponent,
    //DeleteitemComponent,
    UpdateitemComponent,
    //AdditemComponent,
    AdminLoginComponent,
    UserListComponent,
    UserCreateComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
