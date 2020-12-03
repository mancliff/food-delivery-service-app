import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { User } from 'src/app/interfaces/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fs : AngularFirestore) { }


  CreateNewUser(id, username){
    this.fs.doc('user/' + id).set({
      username
    })
    
  }
}
