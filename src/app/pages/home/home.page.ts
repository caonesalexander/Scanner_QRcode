import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AccessProviders } from 'src/app/providers/access-providers';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
   datastorage: any;
   name: string;


  constructor(
    private router: Router,
    private platform: Platform,
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
    this.storage.get('storage_session').then((res)=>{
      console.log(res);
      this.datastorage = res;
      this.name = this.datastorage.your_name;

    });
  }
  async tryLogout() {
    this.storage.clear();
    this.navCtrl.navigateRoot('/login');
    const toast = await this.toastCtrl.create({
      message: 'Logout Successfull!',
      duration: 1500
    });

    toast.present();
  }

}
