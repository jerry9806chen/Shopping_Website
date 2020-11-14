import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IAdmin, Admin } from './admin.model';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private adminsUrl = '/api/admins';

    constructor(private http: Http) { }

    // Get admins
    get(): Promise<Array<IAdmin>> {
        return this.http.get(this.adminsUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Get admin
    getOne(admin: Admin): Promise<IAdmin> {
        return this.http.get(this.adminsUrl + '/' + admin.username)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Get admins
    validate(admin: Admin): Promise<IAdmin> {
        return this.http.get(this.adminsUrl + '/' + admin.username + '/' + admin.password)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Create admin
    create(admin: Admin): Promise<IAdmin> {
        return this.http.post(this.adminsUrl, admin)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Delete a admin
    delete(id: string): Promise<any> {
        return this.http.delete(`${this.adminsUrl}/${id}`)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Error handling
    private error(error: any) {
        let message = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(message);
    }
}
