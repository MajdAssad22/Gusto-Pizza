import { Order } from "./order";

export class Customer {
    CustomerId: number = -1;
    FirstName: string = "";
    LastName: string = "";
    Phone: string = "";
    Address: string = "";
    Email: string = "";
    Orders: Array<Order> = new Array<Order>();

    constructor(customerId: number, firstName: string, lastName: string, phone?: string, address?: string, email?: string, orders?: Array<Order>) {
        this.CustomerId = customerId;
        this.FirstName = firstName;
        this.LastName = lastName;
        if (phone) {
            this.Phone = phone;
        }
        if (address) {
            this.Address = address;
        }
        if (email) {
            this.Email = email;
        }
        if (orders) {
            this.Orders = orders;
        }
    }
}
