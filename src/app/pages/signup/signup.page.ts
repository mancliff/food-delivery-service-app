import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  allet: any;
  username: string;
  password:string;
  confirmPassword: string;

  constructor(private a_th: AuthService, private us : UserService, private route: Router, private alert : AlertController, private d_auth: AngularFireAuth){}

  

  ngOnInit() {
  }
  
  async signup(){

    

    const{ username, password, confirmPassword} = this
    if(password == confirmPassword){

      try{
        const res = await this.a_th.signup(username,password)
        this.AllertAll("Successful",  "User has been Successfully Registerd!")
        this.route.navigate(["signin"])

        this.us.CreateNewUser(res.user.uid, username)
        console.log("Response", res)
       
      
      }catch(error)
      {
        this.AllertAll("Error!", error.message);
        
        console.dir("Error",error.message)
        
      }

    }

    else{
      this.AllertAll("Error","The password and confirmation password do not match.");
    }
    // this.AllertAll("Successful",  "User Has Registerd!")

   

  }

  async AllertAll(header:string, message:string){
    this.allet = await this.alert.create(
      {
        header: header,
        message:message,
        buttons: ['ok']
      }
    )
    await this.allet.present()
  }

}
