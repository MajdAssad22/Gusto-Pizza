import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/models/customer';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  isLoading: boolean = false;
  matchedPassword: boolean = true;

  constructor(private loginService:LoginService, private router: Router) {
  }
  ngOnInit(): void {
  }

  register(registerFrom: NgForm){
    let registerInfo = registerFrom.value;
    let newCustomer = new Customer(undefined,
                                    registerInfo.FirstName,
                                    registerInfo.LastName,
                                    registerInfo.Password,
                                    registerInfo.Phone,
                                    registerInfo.Address,
                                    registerInfo.Email);
    this.loginService.register(newCustomer)
    .then(result =>{
      registerFrom.reset();
      alert("Registered Successfully.");
      this.router.navigate(['/Login']);
    })
    .catch(err =>{
      registerFrom.resetForm();
      alert(err);

    })
  }
}
