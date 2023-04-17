import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProducts:undefined | Product[]
  trendyProducts:undefined | Product[]

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.popularProduct().subscribe((res)=>{
      console.log("aAaAA",res)
      this.popularProducts=res
    })
    this.productService.trendyProducts().subscribe((res)=>{
      this.trendyProducts=res
    })
  }

}
