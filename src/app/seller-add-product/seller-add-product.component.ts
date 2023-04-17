import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  constructor(private product:ProductService) { }

  ngOnInit(): void {
  }

  submit(data:Product){
    this.product.addProduct(data).subscribe((result)=>{
      console.log(result)
      if(result){
        window.alert("Product succefully added")
      }
    })
  }

}
