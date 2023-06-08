import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProducts: undefined | Product[]
  trendyProducts: undefined | Product[]
  phoneNumber: any;

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.popularProduct().subscribe((res:any) => {
      console.log("aAaAA", res)
      this.popularProducts = res
    })
    this.productService.trendyProducts().subscribe((res:any) => {
      this.trendyProducts = res
    })
    
  }

    redirect(data:any){
      console.log(data.phone)
      let name=data.name
      console.log("naaa",name )
      let url="https://wa.me/9924279484?text="+"%0aHi Sir,%0a"+"My Name is "+name+"%0aThanking You....!"
      window.open(url, '_blank');
    }

}
