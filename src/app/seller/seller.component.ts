import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  constructor(private sellerservice:SellerService, private router:Router) { }

  showLogIn=false
  loginErrrorMsg:string=''

  ngOnInit(): void {
    // this.usergetdata()
  }

  signUp(data:SignUp):void{
    this.sellerservice.userSignUp(data)
  }

  LogIn(data:SignUp):void{
    console.log(data)
    this.sellerservice.userLogIn(data)
    this.sellerservice.isloggInError.subscribe((iserror)=>{
      if(iserror){
        this.loginErrrorMsg='Email and password is not correct'
      }
    })
  }

  openLogin(){
     this.showLogIn=true
  }

  openSignUp(){
    this.showLogIn=false
  }

}
