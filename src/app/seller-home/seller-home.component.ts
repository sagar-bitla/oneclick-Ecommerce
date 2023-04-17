import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  productList:undefined | Product[]
  display = "none";
  @ViewChild('updateProduct')
  form!: NgForm;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.productList().subscribe((res)=>{
      console.log("productlist",res)
      this.productList=res
    })
  }

  deleteProduct(id:number){
    console.log("test id",id)
    this.productService.deleteProduct(id).subscribe((res)=>{
      console.log("delete succesfully",res)
      window.alert("Product delete sucessfully")
      this.ngOnInit()
    })
  }


  openModal(id:number) {
    console.log("delete id",id)
    
    //get the product based on the id
   let currentProduct= this.productList?.find((res)=>{ return res.id === id })
   console.log("currenttttvalueeee",currentProduct)
   console.log("ssss",this.form)

   //populate the form with the product details
   this.form.setValue({
    name:currentProduct?.name,
    price:currentProduct?.price,
    color:currentProduct?.color,
    category:currentProduct?.category,
    description:currentProduct?.description,
    url:currentProduct?.url
   })

    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

  submit(data:Product){
    console.log("abcd",data)
    if(this.productList){
      console.log("idddddd",this.productList)
      // data.id=this.productList.id   ---------> edit product details mode not working bcoz of this line code something wrong we can try later 
    }
    this.productService.updateProductList(data).subscribe((res)=>{
      console.log("sagarrrrr",res)
      // this.productList=res
    })
    this.display = "none";
  }

}
