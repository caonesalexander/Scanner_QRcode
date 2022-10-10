/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */


import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

import { AccessProviders } from '../../providers/access-providers';

import { HAMMER_LOADER } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  your_name: string = '';
  gender: string = '';
  date_birth: string= '';
  email_address: string = '';
  password: string = '';
  confirm_pass: string = '';

  disableButton;


  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.disableButton = false;
  }

  async tryRegister(){
  if(this.your_name === ''){
    this.presentToast('Your Name is Required!');
  }else if(this.email_address === ''){
        this.presentToast('Email Address is Required!');
  }else if(this.gender === ''){
    this.presentToast('Gender is Required!');
  }else if(this.date_birth === ''){
    this.presentToast('Date of Birth is Required!');
  }else if(this.password ===''){
        this.presentToast('Password is Required!');
  }else if(this.confirm_pass !== this.password){
    this.presentToast('Password is not the same.');
  }else{
        this.disableButton = true;
        const loader = await this.loadingCtrl.create({
          message: 'Please wait......',
        });
        loader.present();

        return new Promise((_resolve) => {
          const body = {
            action: 'process_register',
            your_name: this.your_name,
            gender: this.gender,
            date_birth: this.date_birth,
            email_address: this.email_address,
            password: this.password

            }
          // eslint-disable-next-line @typescript-eslint/type-annotation-spacing
          this.accsPrvds.postData(body, 'proses_api.php').subscribe((res: any) =>{
            if(res.success == false){

              loader.dismiss();
              this.disableButton = false;
              this.presentToast(res.msg);



            }else{
              loader.dismiss();
              this.disableButton = false;
              this.presentToast(res.msg);
              this.router.navigate(['/login']);


            }

          },(_err)=>{
            loader.dismiss();
            this.disableButton = false;
            this.presentToast('Register Successfully!!');
            this.router.navigate(['/login']);

          });

        });

  }
}

async presentToast(a){
  const toast = await this.toastCtrl.create({
    message: a,
    duration: 1500,
    position: 'top'

  });
  toast.present();
}
async presentAlert(a){
  const alert = await this.alertCtrl.create({
    header: a,
    backdropDismiss: false,
    buttons: [
      {
        text: 'Close',
        handler: (_blah)=>{
          console.log('Confirm Cancel: blah');
        }
        }, {
        text: 'Try Again',
        handler:(_blah)=>{
        this.tryRegister();
        }
      }
    ]

  });
  await alert.present();
}

}

