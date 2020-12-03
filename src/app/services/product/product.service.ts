import { Injectable } from '@angular/core';

import {AngularFirestore} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private fs : AngularFirestore, private  storage : AngularFireStorage) { }

  createProduct(productname: string, price: Number, image: File){
    return new Promise((resolve, reject) => {
    let ref = this.storage.ref('products/' + image.name)
    ref.put(image).then(() => {
      ref.getDownloadURL().subscribe(imgUrl => {
        this.fs.collection('products').add({
          productname,
          price,
          imgUrl
        }).then(() => resolve('hello'))
      })
    })
  })
  }

  getAllProducts(){
    return this.fs.collection('products').snapshotChanges()
  }

}

