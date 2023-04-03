import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogIn, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isloggInError = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private route: Router) { }

  userSignUp(data: SignUp) {
    this.http.post('http://localhost:3000/posts', data, { observe: 'response' }).subscribe((res) => {
      this.isSellerLoggedIn.next(true)
      localStorage.setItem('seller', JSON.stringify(res.body))
      this.route.navigate(['seller-home'])
      console.log("resultttt", res)
    })
    return false
  }

  //this reloader function is work on when user entered after signup and when reload land on same page 
  reloader() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true)
      this.route.navigate(['seller-home'])
    }
  }

  userLogIn(data: LogIn) {
    console.log(data)
    this.http.get(`http://localhost:3000/posts?email=${data.email}&password=${data.password}`,
      { observe: 'response' }).subscribe((res: any) => {
        console.log(res)
        if (res && res.body && res.body.length) {
          localStorage.setItem('seller', JSON.stringify(res.body))
          this.route.navigate(['seller-home'])
          console.log("user logged In")
        } else {
          console.log("login failed")
          this.isloggInError.emit(true)
        }
      })
  }

}
