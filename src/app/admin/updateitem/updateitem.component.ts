import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/entities/product/product.service';
import { IProduct, Product } from 'src/app/entities/product/product.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-updateitem',
  templateUrl: './updateitem.component.html',
  styleUrls: ['./updateitem.component.css']
})
export class UpdateitemComponent implements OnInit {

  productForm: FormGroup;
  name: string = '';
  brand: string = '';
  price: number = 0;
  @Input() productToUpdate: IProduct = null;
  @Output() updatedProduct = new EventEmitter<IProduct>();
  error: boolean = false;

  constructor(protected productService: ProductService) { }

  // Load all the products when starting the view.
  ngOnInit(): void {
    this.initForm();
    console.log(this.productToUpdate)
    /*this.productForm.value['name'] = this.productToUpdate.name;
    this.productForm.value['brand'] = this.productToUpdate.brand;
    this.productForm.value['price'] = this.productToUpdate.price;*/
  }

  // Manage the submit action and create the new product.
  onSubmit() {
    const product = new Product(this.productForm.value['name'], this.productForm.value['brand'], this.productForm.value['price'], this.productToUpdate._id);
    this.productService.update(product, this.productToUpdate._id).then((result: IProduct) => {
      if (result === undefined) {
        this.error = true;
      } else {
        this.error = false;
        this.updatedProduct.emit(result);
      }
    });
  }

  // Hide the error message.
  hideError() {
    this.error = false;
  }

  // Init the creation form.
  private initForm() {
    this.productForm = new FormGroup({
      name: new FormControl(this.name, Validators.required),
      brand: new FormControl(this.brand, Validators.required),
      price: new FormControl(this.price, Validators.required)
    });
  }
}
