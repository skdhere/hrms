import { Component } from '@angular/core';
import { NavController,IonicPage} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private geolocation: Geolocation) {
  	this.watchLoc();
  }

  watchLoc()
  {
	  	let watch = this.geolocation.watchPosition();
		watch.subscribe((data) => {
		 // data can be a set of coordinates, or an error (if an error occurred).
		 // data.coords.latitude
		 // data.coords.longitude
		 console.log(data);
		});
  }
}
