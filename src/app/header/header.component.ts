import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType: string = "default";
  sellerName: string = '';
  userName: string = '';
  searchResult: undefined | Product[]
  cartItem = 0;

  constructor(private route: Router, private productservice: ProductService) { }

  ngOnInit(): void {

    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller')
          let sellerData = sellerStore && JSON.parse(sellerStore)
          console.log("selllerrereDattttt", sellerData[0].name)
          this.sellerName = sellerData[0].name
          this.menuType = "seller";
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user')
          let userData = userStore && JSON.parse(userStore)
          console.log("userdata", userData)
          this.userName = userData.name
          console.log("username", this.userName)
          this.menuType = "user";
          this.productservice.getCardList(userData.id)
        } else {
          console.log("outside seller")
          this.menuType = "default"
        }
      }
    })

    // addtocart badge number increment and decrement function
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItem = JSON.parse(cartData).length
      console.log("cartlegthhhhh", this.cartItem)
    }

    this.productservice.cartDataLength.subscribe((item) => {
      this.cartItem = item.length
    })

  }

  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
    this.productservice.cartDataLength.emit([]);
  }

  sellerLogOut() {
    localStorage.removeItem('seller');
    this.route.navigate(['/home'])
  }

  searchProduct(data: KeyboardEvent) {
    if (data) {
      const element = data.target as HTMLInputElement
      console.log(element.value, "element")
      this.productservice.searchProduct(element.value).subscribe((res) => {
        console.log(res, "dhgsyad")
        this.searchResult = res
      })
    }
  }
  hideSearch() {
    this.searchResult = undefined
  }
  submitSearch(val: string) {
    console.log(val)
    this.route.navigate([`search/${val}`])
  }



}
