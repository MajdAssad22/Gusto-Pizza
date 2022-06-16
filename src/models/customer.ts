import { Order } from "./order";

export class Customer {
    CustomerId: number = -1;
    FirstName: string = "";
    LastName: string = "";
    Phone: string = "";
    Address: string = "";
    Email: string = "";
    Orders: Array<Order> = new Array<Order>();
    Password: string = "";

    constructor(CustomerId: number, FirstName: string, LastName: string, Password: string, Phone?: string, Address?: string, Email?: string) {
        this.CustomerId = CustomerId;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Password = Password;
        if (Phone) {
            this.Phone = Phone;
        }
        if (Address) {
            this.Address = Address;
        }
        if (Email) {
            this.Email = Email;
        }
    }
}
