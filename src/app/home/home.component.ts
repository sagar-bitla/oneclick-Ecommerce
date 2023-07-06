import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { jsonAPI, Product } from '../data-type';
import { ProductService } from '../services/product.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { OrderPipe } from 'ngx-order-pipe';




// import * as html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  popularProducts: undefined | Product[]
  trendyProducts: undefined | Product[]
  filterCategory: undefined | Product[]
  jsondata1: any
  jsondata: any;
  order: any
  showdata: undefined | Product[]
  isDesc: boolean = false
  phoneNumber: any;
  isScrolled: boolean = false;

  //pagination 
  p: number = 1;


  @ViewChild('pdfContent', { static: false })
  pdfContent!: ElementRef;


  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  location: any;
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.popularProduct().subscribe((res: any) => {
      console.log("aAaAA", res)
      this.popularProducts = res
    })
    this.productService.trendyProducts().subscribe((res: any) => {
      this.trendyProducts = res
      this.filterCategory = res
      console.log(this.trendyProducts, "trendyproductsss")

      //  mobile categoty + laptop  category replace name of fashion in cateogory ---> this filter product lect is let's program channel   
      this.trendyProducts?.forEach((product: Product) => {
        if (product.category === "mobile" || product.category === "laptop") {
          product.category = "Electronics"
        }
      })
      console.log(this.trendyProducts, "mobile+laptop")
    })

    this.productService.getFakeJson().subscribe((res: any) => {
      this.jsondata = res
      this.jsondata1 = res
      console.log("fakejsondata", this.jsondata)
      console.log("fakejsondata111", this.jsondata1)
      this.jsondata1.forEach((res: any) => {
        this.order = res
      });
    })

  }

  //filter product from particular category
  filterProduct(category: string) {
    if (category == 'all') {
      this.filterCategory = this.trendyProducts
    }
    else {
      this.filterCategory = this.trendyProducts?.filter((product: Product) => {
        return product.category === category
      })
    }
    console.log(this.filterCategory, "dewdew")
  }

  //search functionality
  private _searchBy = "";
  get searchBy() {
    return this._searchBy
  }

  set searchBy(product_name: string) {
    this._searchBy = product_name;
    this.filterCategory = this.trendyProducts?.filter(product => product.name.toLocaleLowerCase().includes(product_name.toLocaleLowerCase())

    )
  }


  redirect(data: any) {
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

  generatePDF() {

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  //  search functionality for jsonfake table
  private _titleSearch = "";
  get searchTableBy() {
    return this._titleSearch
  }

  set searchTableBy(title_name: string) {
    this._titleSearch = title_name;
    this.jsondata1 = this.jsondata.filter((res: { title: string; }) => res.title.toLocaleLowerCase().includes(title_name.toLocaleLowerCase()))
    this.jsondata1 = this.jsondata.filter((res: { body: string; }) => res.body.toLocaleLowerCase().includes(title_name.toLocaleLowerCase()))
  }

  //sort number
  sortID() {
 
    if (this.order) {
      let newrrr = this.jsondata1.sort((a: any, b: any) => a.id - b.id);
      this.showdata = newrrr
    } else {
      let newrrr = this.jsondata1.sort((a: any, b: any) => b.id - a.id);
      this.showdata = newrrr
    }
    this.order = !this.order
  }

  //sort alphabet
  sortTitle(title: string) {
    this.isDesc = !this.isDesc;

    let direction = this.isDesc ? 1 : -1;

    this.jsondata1?.sort(function (a: any, b: any) {
      if (a[title] < b[title]) {
        return -1 * direction;
      } else if (a[title] > b[title]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }

  //sort alphabet
  sortBody(body: string) {
    this.isDesc = !this.isDesc;

    let direction = this.isDesc ? 1 : -1;

    this.jsondata1?.sort(function (a: any, b: any) {
      if (a[body] < b[body]) {
        return -1 * direction;
      } else if (a[body] > b[body]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }

 

}
