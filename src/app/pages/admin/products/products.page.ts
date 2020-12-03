import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { NgForm } from '@angular/forms';

import { finalize } from 'rxjs/operators';
import {Observable} from 'rxjs'; 
import { Product } from 'src/app/interfaces/product/product';




@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  @ViewChild('image') image: ElementRef
  constructor(private ps: ProductService, private storage: AngularFireStorage) {  }

  ngOnInit() {
  }

  addProduct(form : NgForm){
   
    let productname = (<Product>form.value).productname,
      
      price = (<Product>form.value).price,
      image = (<HTMLInputElement>this.image.nativeElement).files[0];
      this.ps.createProduct(productname, price, image)
  }

}
