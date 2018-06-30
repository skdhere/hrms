import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AuthService} from '../../providers/auth-service/auth-service';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

 registerCredentials = { email: '', password: '' };
  constructor(public events:Events,public navCtrl: NavController, public navParams: NavParams,public api :ApiProvider,public auth :AuthService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  checkLogin()
  {
	this.auth.login(this.registerCredentials).subscribe(allowed => {
        if (allowed == 'success') {        
            this.navCtrl.setRoot('DashboardPage');
            this.events.publish('auth:onLogin');
        } else if(allowed == 'fail'){
            this.showError("Access Denied");
        } else{
            this.showError('Something went wrong, please try again!');
        }
    },
    error => {
        this.showError('Something went wrong, please try again!');
    });
  }

}
