import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, Product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartDataLength = new EventEmitter<Product[] | []>()

  constructor(private http: HttpClient) { }

  addProduct(data: Product) {
    console.log("product service called")
    return this.http.post('http://localhost:3000/products', data)
  }

  productList() {
    return this.http.get<Product[]>('http://localhost:3000/products')
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  updateProductList(product: Product) {
    return this.http.put<Product>(`http://localhost:3000/products/${product.id}`, product)
  }

  getProduct(id: any) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`)
  }
  popularProduct() {
    return this.http.get<Product[]>(`http://localhost:3000/products?_limit=3`)
  }
  trendyProducts() {
    return this.http.get<Product[]>(`http://localhost:3000/products?_limit=8`)
  }
  searchProduct(query: string) {
    return this.http.get<Product[]>(`http://localhost:3000/products?=${query}`)
  }

  //jsonplaceholder fake api
  getFakeJson(){
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
  }

  //AddtoCart without LogIn 
  localAddToCart(data: Product) {
    let cartData = [];
    let localcart = localStorage.getItem('localCart')
    if (!localcart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartDataLength.emit([data]);
    } else {
      cartData = JSON.parse(localcart)
      cartData.push(data)
      localStorage.setItem('localCart', JSON.stringify(cartData))
      console.log("cartdatatatatataat", cartData)
      this.cartDataLength.emit(cartData)
    }

  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: Product[] = JSON.parse(cartData);
      console.log("ggfgfg",items)
      items = items.filter((item: Product) => productId !== item.id)
      console.log("iteeeaaea",items)
      localStorage.setItem('localCart', JSON.stringify(items))
      this.cartDataLength.emit(items)
    }
  }

  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData)
  }

  //add to cart particular userid when user product added
  getCardList(userId: number) {
    return this.http.get<Product[]>('http://localhost:3000/cart?userId=' + userId,
      { observe: 'response' }).subscribe((res) => {
        console.log("ndend", res)
        if (res && res.body) {
          this.cartDataLength.emit(res.body)
        }
      })
  }

  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId)
  }

  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<any[]>('http://localhost:3000/cart?userId=' + userData.id)
  }

  orderNow(data: order) {
    return this.http.post('http://localhost:3000/orders', data)
  }

  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:3000/orders?userId=' + userData.id)
  }

  deleteCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId, { observe: 'response' }).subscribe((res) => {
      if (res) {
        this.cartDataLength.emit([])
      }
    })
  }

  cancelOrder(orderId: number) {
    return this.http.delete('http://localhost:3000/orders/' + orderId);
  }

}
