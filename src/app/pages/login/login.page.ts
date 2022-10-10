/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AccessProviders } from 'src/app/providers/access-providers';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email_address: string = '';
  password: string = '';

   disableButton;

  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private storage: Storage,
    private navCtrl: NavController,
    private accsPrvds: AccessProviders,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,


  ) { }



  ngOnInit() {
  }
  ionViewDidEnter(){
    this.disableButton = false;
  }

  openRegister(){
    this.router.navigate(['/register']);
  }
  async tryLogin(){
    if(this.email_address === ''){
      this.presentToast('Your Name is Required!');
    }else if(this.password ===''){
          this.presentToast('Password is Required!');
    }else{
          this.disableButton = true;
          const loader = await this.loadingCtrl.create({
            message: 'Please wait......',
          });
          loader.present();

          return new Promise((_resolve) => {
            const body = {
              action: 'process_login',
              email_address: this.email_address,
              password: this.password

              }
            // eslint-disable-next-line @typescript-eslint/type-annotation-spacing
            this.accsPrvds.postData(body, 'proses_api.php').subscribe((res: any) =>{
              if(res.success == true){

                loader.dismiss();
                this.disableButton = false;
                this.presentToast('Login Successfully!!');
                this.storage.set('storage_session',res.result);
                this.router.navigate(['/home']);


              }else{
                loader.dismiss();
                this.disableButton = false;
                this.presentToast('Email or Password is Wrong!');


              }

            },(_err)=>{
              loader.dismiss();
              this.disableButton = false;
              this.presentToast('Email or Password is Wrong!');
              // this.router.navigate(['/home']);

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
  // async presentAlert(a){
  //   const alert = await this.alertCtrl.create({
  //     header: a,
  //     backdropDismiss: false,
  //     buttons: [
  //       {
  //         text: 'Close',
  //         handler: (_blah)=>{
  //           console.log('Confirm Cancel: blah');
  //         }
  //         }, {
  //         text: 'Try Again',
  //         handler:(_blah)=>{
  //         this.tryRegister();
  //         }
  //       }
  //     ]

  //   });
  //   await alert.present();
  // }

}

