import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  constructor(private sellerservice:SellerService, private router:Router) { }

  ngOnInit(): void {
  }

  signUp(data:SignUp):void{
    console.log(data);
    this.sellerservice.userSignUp(data).subscribe((res)=>{
      if(res){
        this.router.navigate(['seller-home'])
        console.log(res)
      }
      
    })
  }

}
