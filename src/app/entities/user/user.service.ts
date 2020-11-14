import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IUser, User } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private usersUrl = '/api/users';

    constructor(private http: Http) { }

    // Get users
    get(): Promise<Array<IUser>> {
        return this.http.get(this.usersUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Create user
    create(user: User): Promise<IUser> {
        console.log(user);
        return this.http.post(this.usersUrl, user)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Update user
    update(user: User, userId: string): Promise<IUser> {
        return this.http.patch(this.usersUrl + "/" + userId, user)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Get user
    getOne(user: User): Promise<IUser> {
        return this.http.get(this.usersUrl + '/' + user.username)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Validate user
    validateUser(user: User): Promise<IUser> {
        return this.http.get(this.usersUrl + '/' + user.username + '/' + user.password)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Delete a user
    delete(id: string): Promise<any> {
        return this.http.delete(`${this.usersUrl}/${id}`)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Add an item to the user's cart.
    updateCartAndWishlist(user: IUser): Promise<IUser> {
        console.log('Red Forman')
        return this.http.put(this.usersUrl + "/" + user._id, user)
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
