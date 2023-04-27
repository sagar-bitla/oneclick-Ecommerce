import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, Product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartDataLength= new EventEmitter<Product[] | []>()

  constructor(private http:HttpClient) { }

  addProduct(data:Product){
    console.log("product service called")
    return this.http.post('http://localhost:3000/products',data)
  }

  productList(){
    return this.http.get<Product[]>('http://localhost:3000/products')
  }

  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  updateProductList(product:Product){
    return this.http.put<Product>(`http://localhost:3000/products/${product.id}`,product)
  }
  
  getProduct(id:any){
    return this.http.get<Product>(`http://localhost:3000/products/${id}`)
  }
  popularProduct(){
    return this.http.get<Product[]>(`http://localhost:3000/products?_limit=3`)
  }
  trendyProducts(){
    return this.http.get<Product[]>(`http://localhost:3000/products?_limit=8`)
  }
  searchProduct(query:string){
    return this.http.get<Product[]>(`http://localhost:3000/products?=${query}`)
  }

  //AddtoCart without LogIn 
  localAddToCart(data:Product){
    let cartData=[];
    let localcart=localStorage.getItem('localCart')
    if(!localcart){
      localStorage.setItem('localCart',JSON.stringify([data]));
    }else{
      cartData=JSON.parse(localcart)
      cartData.push(data)
      localStorage.setItem('localCart',JSON.stringify(cartData))
      console.log("cartdatatatatataat",cartData)
    }
    this.cartDataLength.emit(cartData)
  }

  removeItemFromCart(productId:number){
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      let items:Product[]=JSON.parse(cartData);
      items=items.filter((item:Product)=>productId!==item.id)
      localStorage.setItem('localCart',JSON.stringify(items))
      this.cartDataLength.emit(items)
    }
  }

  addToCart(cartData:cart){
    return this.http.post('http://localhost:3000/cart',cartData)
  }
}
