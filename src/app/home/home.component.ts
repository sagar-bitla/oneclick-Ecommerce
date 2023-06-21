import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';




// import * as html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProducts: undefined | Product[]
  trendyProducts: undefined | Product[]
  phoneNumber: any;
  isScrolled: boolean = false;
  

  storedTheme = localStorage.getItem('theme-color');

  @ViewChild('pdfContent', { static: false })
  pdfContent!: ElementRef;


  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  location: any;
  constructor(private productService: ProductService,private router: Router) { }

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
      // console.log(data.phone)
      // let name=data.name
      // console.log("naaa",name )
      // let url="https://wa.me/9924279484?text="+"%0aHi Sir,%0a"+"My Name is "+name+"%0aThanking You....!"
      // window.open(url, '_blank');


      let phoneNumber = 9924279484;

      let message = `Hi Sir,
      My Name is ${data.name}
      Thanking You....!`;
  
      let encodedMessage = encodeURIComponent(message);
      let url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      window.open(url, '_blank');

   
    }

    generatePDF(){

  //     const doc = new jsPDF('p', 'mm', 'a4');

  // const images = [
  //   {
  //     src: 'path/to/your/image1.jpg',
  //     x: 10,
  //     y: 10,
  //     width: 50,
  //     height: 50
  //   },
  //   {
  //     src: 'path/to/your/image2.jpg',
  //     x: 70,
  //     y: 10,
  //     width: 50,
  //     height: 50
  //   }
  // ];

  // images.forEach((image) => {
  //   const { src, x, y, width, height } = image;
  //   doc.addImage(src, 'JPEG', x, y, width, height);
  //   doc.addPage();
  // });

  // doc.save('sample.pdf');

      
      const doc = new jsPDF();

  const content = this.pdfContent.nativeElement;

  html2canvas(content).then((canvas) => {
    const imageData = canvas.toDataURL('image/png');
    const imageProps = doc.getImageProperties(imageData);
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = (imageProps.height * pdfWidth) / imageProps.width;

    doc.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    doc.save('sample.pdf');
  }); 
 

    }

    @HostListener('window:scroll')
    onWindowScroll() {
      this.isScrolled = (window.pageYOffset > 0);
    }
    
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth'});
    }

    setTheme(){
      if(this.storedTheme === 'theme-dark'){
        //toggle and update local storage
        localStorage.setItem('theme-color','theme-light');
        this.storedTheme=localStorage.getItem('theme-color');
      }else{
         //toggle and update local storage
         localStorage.setItem('theme-color','theme-dark');
         this.storedTheme=localStorage.getItem('theme-color');
      }
    }

    
  

   
}
