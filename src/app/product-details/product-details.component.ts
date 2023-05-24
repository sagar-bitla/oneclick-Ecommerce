import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productData: undefined | Product
  productQunatity: number = 1
  removeCart = false
  constructor(private activateRoute: ActivatedRoute, private productservice: ProductService) { }

  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('productId')
    console.log("productid=", productId)

    productId && this.productservice.getProduct(productId).subscribe((res) => {
      console.log(productId)
      this.productData = res
      console.log("productdataaaaa", this.productData)


      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: Product) => productId == item.id.toString())
        console.log("itemssssss", items)
        if (items.length) {
          this.removeCart = true
        } else {
          this.removeCart = false
        }
      }

      let user = localStorage.getItem('user')

      if (user) {
        let userId = user && JSON.parse(user).id
        this.productservice.getCardList(userId)
        this.productservice.cartDataLength.subscribe((result) => {
          //lect 40
          let item = result.filter((item: Product) => productId?.toString() === item.productId?.toString())

          if (item.length) {
            this.removeCart = true
          }
        })
      }


    })
  }

  handleQuantity(val: string) {
    if (this.productQunatity < 20 && val === 'plus') {
      // this.productQunatity=this.productQunatity+1
      this.productQunatity++
    } else if (this.productQunatity > 1 && val === 'minus') {
      this.productQunatity--
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQunatity
      console.log("productquantitytytyt", this.productQunatity)

      //if condition part when user addtocart without using login 
      if (!localStorage.getItem('user')) {
        console.log("if not user not logged in", this.productData)
        this.productservice.localAddToCart(this.productData)
        this.removeCart = true
      } else {
        //else condition part is after user login addtocart
        console.log("user is logged in")
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id
        console.log("usererrrerididid", userId);

        //create a object 
        let cardData: cart = {
          ...this.productData,
          userId: userId,
          productId: this.productData.id,
        }
        delete cardData.id;
        console.log("caeeee", cardData)
        this.productservice.addToCart(cardData).subscribe((result) => {
          if (result) {
            this.productservice.getCardList(userId)
            this.removeCart = true
          }
        })
      }
    }
  }

  //AddtoCart without LogIn & Without get data with Service  -----------------------------------------

  // addToCart(){
  //   if(this.productData){
  //     this.productData.quantity=this.productQunatity

  //     if(!localStorage.getItem('user')){
  //       console.log(this.productData)
  //       this.removeCart=true

  //       let cartData=[];
  //       let localcart=localStorage.getItem('localCart')

  //       if(!localcart){
  //         localStorage.setItem('localCart',JSON.stringify([this.productData]));
  //       }else{
  //         cartData=JSON.parse(localcart)
  //         cartData.push(this.productData)
  //         localStorage.setItem('localCart',JSON.stringify(cartData))
  //         console.log("cartDataData",cartData)
  //       }
  //     }else{
  //       console.log("elseeeeee")
  //     }
  //   }
  // }

  //removecart function if condition is remove from cart when cart added in localstorage and else condition is when user logi after cart added 
  RemoveCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.productservice.removeItemFromCart(productId);
      this.removeCart = false
    } else {
      
    }
  }

  //------------------removecart without using login && without using service file----------------------

  // RemoveCart(productId:number){
  //   let cartData=localStorage.getItem('localCart');
  //   if(cartData){
  //     let items:Product[]=JSON.parse(cartData);
  //     items=items.filter((item:Product)=>productId!==item.id)
  //     localStorage.setItem('localCart',JSON.stringify(items))
  //     this.removeCart=true;    
  //   }
  // }

}
