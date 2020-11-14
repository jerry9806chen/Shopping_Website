import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IProduct, Product } from './product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productsUrl = '/api/products';

    constructor(private http: Http) { }

    // Get products
    get(): Promise<Array<IProduct>> {
        return this.http.get(this.productsUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Get a products
    getOne(product: Product): Promise<IProduct> {
        return this.http.get(this.productsUrl + "/" + product._id)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Create product
    create(product: Product): Promise<IProduct> {
        console.log(product);
        return this.http.post(this.productsUrl, product)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Update product
    update(product: Product, productId: string): Promise<IProduct> {
        return this.http.patch(this.productsUrl + "/" + productId, product)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Delete a product
    delete(id: string): Promise<any> {
        return this.http.delete(`${this.productsUrl}/${id}`)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // test method
    stringTest(): string {
        return 'test';
    }

    // Error handling
    private error(error: any) {
        let message = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(message);
    }
}
