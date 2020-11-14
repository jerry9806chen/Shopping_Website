import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/entities/product/product.service';
import { IProduct } from 'src/app/entities/product/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnChanges {

  products: Array<IProduct> = [];
  @Input() productToDisplay: IProduct = null;
  @Output() productToUpdate = new EventEmitter<IProduct>();
  updateItem: boolean;

  constructor(protected productService: ProductService) { }

  // Load all the products when starting the view.
  ngOnInit(): void {
    this.loadAll();
  }

  // If new product created, we add it to the list.
  ngOnChanges(): void {
    console.log('on changes called')
    console.log(this.productToDisplay)
    if (this.productToDisplay !== null) {
      //this.products.push(this.productToDisplay);
      this.loadAll();
    }
  }

  // Delete a product. 
  delete(id: string) {
    this.productService.delete(id).then((result: any) => this.loadAll());
  }

  // Update a product.
  update(product: IProduct) {
    //this.productService.update(id).then((result:any) => this.loadAll());
    //this.updateItem = true;
    console.log('emitting')
    this.productToUpdate.emit(product)
  }

  // Load all products.
  private loadAll() {
    this.productService
      .get()
      .then((result: Array<IProduct>) => {
        this.products = result;
      });
  }

}
