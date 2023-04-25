import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerComponent } from './seller/seller.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent,
  },
  {
    path:'seller-auth',
    component:SellerComponent
  },
  {
    path:'seller-home',
    component:SellerHomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'seller-add-product',
    component:SellerAddProductComponent,
    canActivate:[AuthGuard]
  },
  {
    component:SearchComponent,
    path:'search/:query',
  },
  {
    component:ProductDetailsComponent,
    path:'details/:productId',
  },
  {
    component:UserAuthComponent,
    path:'user-auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
