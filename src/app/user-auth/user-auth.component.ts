import { Component, OnInit } from '@angular/core';
import { LogIn, SignUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  showLogIn:boolean=true
  userError:string=" "

  constructor(private userservice:UserService) { }

  ngOnInit(): void {
    this.userservice.userAuthReloaad()
  }

  signUp(data:SignUp){
    this.userservice.userSignup(data)
  }

  LogIn(data:LogIn){
    this.userservice.userLogin(data)
    this.userservice.invalidUserName.subscribe((res)=>{
      console.log(res,"invaliddd")
      if(res){
        // window.alert("Please enter valid user details")
        this.userError='Please enter valid user details'
      }
    })
  }

  openLogin(){
    this.showLogIn=false
  }
  openSignUp(){
    this.showLogIn=true
  }

}
