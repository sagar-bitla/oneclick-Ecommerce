import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LogIn, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserName = new EventEmitter<boolean>(false)

  constructor(private http:HttpClient,private router:Router) { }

  // {observe:'response'}    ------->   to display full response

  userSignup(data:SignUp){
    this.http.post("http://localhost:4000/user",data,{observe:'response'}).subscribe((res)=>{
      console.log(res)
      if(res){
        localStorage.setItem('user',JSON.stringify(res.body))
        this.router.navigate(["/home"])
      }
    })
  }

  userLogin(data:LogIn){
    this.http.get(`http://localhost:4000/user?email=${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((res:any)=>{
      console.log(res)
      if(res && res.body && res.body.length){
        this.invalidUserName.emit(false)
        // localStorage.setItem('user',JSON.parse(res.body[0]))
        localStorage.setItem('user',JSON.stringify(res.body[0]))
        this.router.navigate(["/home"])
      }else{
        this.invalidUserName.emit(true)
      }
    })
  }

  // userAuthReloaad()  this function means once user entered sign up after not relooad the signup page
  userAuthReloaad(){                                      
    if(localStorage.getItem('user')){
      this.router.navigate(["/home"])
    }
  }
}
