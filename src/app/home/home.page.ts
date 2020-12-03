import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';

import { Product } from '../interfaces/product/product';
import { AuthService } from '../services/auth/auth.service';
import { CartService } from '../services/cart/cart.service';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isUser: boolean = false

  products: Product[] = []
  cart = [];
  productsObservable: Subscription
  cartItemCount: BehaviorSubject<number>;

  constructor(private ps : ProductService,private a_th : AuthService, private cartSvc: CartService, private modalCtrl: ModalController) {}
  

  slidesOptions = {

  }

  ngOnInit(): void {


    this.a_th.user.subscribe(user => {
      if (user) {
        this.isUser = true
        this.a_th.userId = user.uid
      }
      else {
        this.isUser = false
        this.a_th.userId = ''
      }

    })

    this.productsObservable = this.ps.getAllProducts().subscribe(data => {
      this.products = data.map(element => {
        return {
          id: element.payload.doc.id, 
          ...element.payload.doc.data() as {}
        }
      })
    })

  }
}
