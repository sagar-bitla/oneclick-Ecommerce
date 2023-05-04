import { Component, OnInit } from '@angular/core';
import { cart, LogIn, Product, SignUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  showLogIn: boolean = true
  userError: string = " "
  user: any;
  

  constructor(private userservice: UserService, private productservice: ProductService) { }

  ngOnInit(): void {
    this.userservice.userAuthReloaad()
  }

  signUp(data: SignUp) {
    this.userservice.userSignup(data)
  }

  LogIn(data: LogIn) {
    this.userservice.userLogin(data)
    this.userservice.invalidUserName.subscribe((res) => {
      console.log(res, "invaliddd")
      if (res) {
        // window.alert("Please enter valid user details")
        this.userError = 'Please enter valid user details'
      } else {
        console.log("get data ")
        setTimeout(() => {
          this.localCartToRemortCart()
        });
        
      }
    })
  }

  openLogin() {
    this.showLogIn = false
  }
  openSignUp() {
    this.showLogIn = true
  }

  //when user enter after login and get hitting the logIn() function else part that is i.e localCartRemotCart()
  //this function working before user login localCart localstorage data stored into the after user login localstorage into the database     lecture:39 codestepbystep   
  
  localCartToRemortCart() {
    let data = localStorage.getItem('localCart');
    this.user = localStorage.getItem('user');
    const newdata=JSON.parse(this.user)
    let userId = this.user && JSON.parse(this.user).id;
    console.log("user local storage data",newdata)
    console.log("usr id",userId)

    if (data) {
      let cardDataList: Product[] = JSON.parse(data);
      cardDataList.forEach((product: Product, index) => {
        let cardData: cart = {
          ...product,
          productId: product.id,
          userId
        };
        delete cardData.id;
        console.log("carddatacarddata", cardData)

        setTimeout(() => {
          this.productservice.addToCart(cardData).subscribe((result) => {
            if (result) {
              console.log("Item stored in DB");
            }
          })
          if (cardDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }

    // setTimeout(() => {
    //   this.productservice.getCardList(userId)  
    // }, 2000);

    this.productservice.getCardList(userId)
   
  }


}