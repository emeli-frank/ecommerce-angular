import { Identifiers } from "@angular/compiler";
import { Roles } from "../enums/roles.enum";

export abstract class User {
  constructor(public id: number, public firstName: string, public lastName: string, public email: string, public roles: Roles[]) {}

  static fromJSON(data: UserJSON): User {
    if (this instanceof Customer) {
      return Customer.fromJSON(data);
    }
  }

  abstract toJSON(): object;
}

export class Customer extends User {
  constructor(id: number, firstName: string, lastName: string, email: string, roles: Roles[]) {
    super(id, firstName, lastName, email, roles);
  }

  static fromJSON(data: CustomerJSON): Customer {
    return new Customer(data.id, data.first_name, data.last_name, data.email, data.roles)
  }

  toJSON(): UserJSON {
    return {
      id: this.id,
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      roles: this.roles,
    }
  }
}

interface UserJSON {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  roles: Roles[];
}

interface CustomerJSON extends UserJSON {

}
