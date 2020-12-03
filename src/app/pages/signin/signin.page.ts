import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  username:string;
  password:string;

  
  alluser:any;
  constructor(private a_th: AuthService, private route:Router, private af_auth: AngularFireAuth, private alert : AlertController) { 
    
  }


  ngOnInit() {
  }

  async signin(){
    const {username,password} = this
    try{

      const user = await this.a_th.login(username,password)
      this.AllertAllFfunc("Welcome", username)
      this.route.navigate(["home"])
    }catch(error){
      console.dir(error);
    }
  }

  signup(){
    this.route.navigate(["login"])
  }

  async AllertAllFfunc(header: string, message:string){

    try{
      this.alluser = await this.alert.create({
        header:header,
        message:message,
        buttons: ["Ok"]
      })

      await this.alluser.present()
    }catch(error){

    }

  }

  logout(){
    return this.a_th.logout()
  }

}
