export interface IAdmin {
    _id?: string;
    username: string;
    password: string;
}

export class Admin implements IAdmin {
    constructor(
        public username: string,
        public password: string,
        public _id?: string
    ) {
        this._id = _id ? _id : null;
        this.username = username;
        this.password = password;
    }
}