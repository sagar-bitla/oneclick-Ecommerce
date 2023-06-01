import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

 totalPrice:number|undefined
 cardData:cart[]|undefined
 ordermsg:string | undefined 

  constructor(private productService: ProductService,private router:Router) { }

  ngOnInit(): void {

    this.productService.currentCart().subscribe((result) => {
      let price = 0;
      this.cardData=result
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.totalPrice= price + (price / 10) + 100 - (price / 10)
      console.log("njdd", this.totalPrice);

    })
  }

  //order now function inside bracket i use datatype and we can also used like mentioned inerface in datatype.ts
  //  but only three datatype is thier that's why we mentioned inside order now function

  orderNow(data:{email:string,address:string,contact:string}){
    let user=localStorage.getItem('user');
    let userId=user && JSON.parse(user).id

    if(this.totalPrice){
      let orderData:order={
        ...data,
        totalPrice:this.totalPrice,
        userId,
        //id mentioned in undefined bcoz id is generated dynamically lect 46
        id:undefined
      }

      this.cardData?.forEach((item)=>{
        //why settimeout is apply bcoz json server not working that much of speed 
        setTimeout(() => {
        item.id && this.productService.deleteCart(item.id);
        }, 1000);
      })
      this.productService.orderNow(orderData).subscribe((result)=>{
     
        setTimeout(() => {
          const orderalert="Your order has been successfully"
          this.router.navigate(['/my-orders'],{queryParams:{orderalert}})
        }, 4000);
        
      })
    }
    
  }

}
