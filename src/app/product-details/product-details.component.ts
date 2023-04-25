import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productData:undefined | Product
  productQunatity:number=1
  constructor( private activateRoute:ActivatedRoute,private productservice:ProductService) { }

  ngOnInit(): void {
    let productId=this.activateRoute.snapshot.paramMap.get('productId')
    console.log("productid=",productId)

    productId && this.productservice.getProduct(productId).subscribe((res)=>{
      console.log(productId)
      this.productData=res
    })
  }

  handleQuantity(val:string){
    if(this.productQunatity<20 && val==='plus'){
      // this.productQunatity=this.productQunatity+1
      this.productQunatity++
    }else if(this.productQunatity>1 && val==='minus'){
      this.productQunatity--
    }
  }

}
