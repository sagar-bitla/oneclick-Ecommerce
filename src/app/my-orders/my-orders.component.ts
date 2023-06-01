import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orderData:order[]|undefined
  ordermsg:string|undefined
  messageVisible:boolean|undefined

  constructor(private productservice:ProductService,private route: ActivatedRoute,private location: Location) { }

  ngOnInit(): void {
    this.getOrderList();

    //this queryparams ordermesssege received from checkout page via queryparam
    this.route.queryParams.subscribe(params=>{
      console.log("params",params)
      this.messageVisible=true
      this.ordermsg=params.orderalert
      //declare a method to hide the message and remove the query parameter from the URL:we can use(location service)
      const ordermsg = this.location.path().split('?')[0];
      this.location.replaceState(ordermsg);
    })

    //settimeout use bcoz after 5sec ordermessge should be not display
    setTimeout(() => {
      this.messageVisible=false
    }, 5000);
  }
  
  cancelOrder(orderId:number|undefined){
    orderId && this.productservice.cancelOrder(orderId).subscribe((res)=>{
      this.getOrderList();
    })
  }

  getOrderList(){
    this.productservice.orderList().subscribe((result)=>{
      this.orderData=result
      console.log("orderdattt",this.orderData)
    })
  }

}
