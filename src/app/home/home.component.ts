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

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.popularProduct().subscribe((res) => {
      console.log("aAaAA", res)
      this.popularProducts = res
    })
    this.productService.trendyProducts().subscribe((res) => {
      this.trendyProducts = res
    })
  }


//   ngOnInit(): void {
//     this.productService.getObs1().subscribe(
//       val => console.log(val),
//       err => console.log(err),
//       ()=> console.log("obs1 complate"));

//       this.productService.getObs2().subscribe(
//         val => console.log(val),
//         err => console.log(err),
//         ()=> console.log("obs2 complate"));

//       this.subscribe=  this.productService.getObs3().subscribe(
//           val => console.log(val),
//           err => console.log(err),
//           ()=> console.log("obs3 complate"));

//           this.productService.getObs4()
//           .pipe(filter(val => val%2==0),map(val => val*3))
//           .subscribe(val => console.log(val));

//         // this.productList=this.productService.getProducts()         //////////////////////////////////////////    imppppppppppppppp
//         // this.filterProducts=this.productList

//         this.productService.getProducts().subscribe(
//           data => {
//             this.productList=data
//             this.filterProducts=this.productList                              ////   get api through observable 
//           }
//         )

//   }

//   productList:Products[]=[]            ////api productlist import in service


//   filterProducts=this.productList;

// filterProduct(Rcategory:string):void{
//   if(Rcategory===Category.ALL)
//   {
//     this.filterProducts=this.productList;
//   }
//   else{
//     this.filterProducts=this.productList.filter(pro=>pro.category===Rcategory);
//   }
// }


}
