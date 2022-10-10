import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

import { Storage } from '@ionic/storage';


import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }
  initializeApp(){
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.storage.get('storage_session').then((res) => {
      if(res == null){
        this.navCtrl.navigateRoot('/login');

      }else{
        this.navCtrl.navigateRoot('/home');

      }
    });
    }
}
