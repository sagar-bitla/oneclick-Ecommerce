import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { CheckoutComponent } from '../checkout/checkout.component';
import { cart, priceSummary, Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cardData: any;
  productData: undefined | Product
  cartItem = 0;
  removeCart = true;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  };

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    //lecture 43
    this.productService.currentCart().subscribe((result) => {
      console.log("currr", result)
      this.cardData = result
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      console.log("priceeee", price)
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 20;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10)
      console.log("njdd", this.priceSummary);

    })
    //  addtocart badge number increment and decrement function   start
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItem = JSON.parse(cartData).length
      console.log("cartlegthhhhh", this.cartItem)
    }

    this.productService.cartDataLength.subscribe((item) => {
      this.cartItem = item.length
    })

    //end   
  }

  checkout() {
    this.router.navigate(['/checkout'])
  }

  removeToCart(cartId: number | undefined) {

  }
}





