import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType:string="default";
  sellerName:string='';

  constructor(private route:Router) { }

  ngOnInit(): void {
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller')&& val.url.includes('seller')){
          console.log("in seller area")
          this.menuType="seller"
          if(localStorage.getItem('seller')){
            let sellerStore=localStorage.getItem('seller')
            let sellerData= sellerStore && JSON.parse(sellerStore)
            console.log("selllerrereDattttt",sellerData[0].name)
             this.sellerName=sellerData[0].name
          }
        }else{
          console.log("outside seller")
          this.menuType="default"
        }
      }
    })
  }

  logOut(){
    localStorage.removeItem('seller');
    this.route.navigate(['/home'])
    
  }

}
