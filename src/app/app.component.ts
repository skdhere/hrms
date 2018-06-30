import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Push ,PushObject, PushOptions } from '@ionic-native/push';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'LoginPage';

  constructor(platform: Platform, public statusBar: StatusBar, splashScreen: SplashScreen,public push:Push) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
            this.statusBar.overlaysWebView(true);
            this.statusBar.overlaysWebView(false);
            // let status bar overlay webview
            this.statusBar.overlaysWebView(true);

            // set status bar to white
            this.statusBar.backgroundColorByHexString('#ffffff');
            splashScreen.hide();
    });

    // this.push.hasPermission()
    //   .then((res: any) => {

    //     if (res.isEnabled) {
    //       console.log('We have permission to send push notifications');
    //     } else {
    //       console.log('We do not have permission to send push notifications');
    //     }

    //   });

      // const options: PushOptions = {
      //      android: {},
      //      ios: {
      //          alert: 'true',
      //          badge: true,
      //          sound: 'false'
      //      },
      //      windows: {},
      //      browser: {
      //          pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      //      }
      //   };

      //   const pushObject: PushObject = this.push.init(options);


      //   pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

      //   pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

      //   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
}

