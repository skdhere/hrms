import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  lat:Number;
  lon:Number;

  square:Array<any>=[];
  isInOffice :any = false;
  constructor(public navCtrl: NavController,
  			  public navParams: NavParams,
  			  private geolocation: Geolocation) {

  	this.square = [[10,20],[30,20],[10,30],[30,30]];
	
  }

  ionViewDidEnter()
  {
  	this.isInOffice = false;
  	this.watchLoc();
  }

  watchLoc()
  {
	  	let watch = this.geolocation.watchPosition();
		watch.subscribe((data) => {
		    this.lat = data.coords.latitude
		    this.lon = data.coords.longitude

		    this.isInOffice = this.checkInOffice();
		    console.log();

		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  

  checkInOffice()
  {
  	this.isInOffice = false;
  	let pnt =[20,25];
    console.log('checkInOffice');
  	let square = this.square;
  	if(this.square[0] != square[2])
		{
			let j   = 0 ;
			let res = false;
			let x   = pnt[1];
			let y   = pnt[0];

			square[square.length] = square[0];
			let n  				  = square.length;
			
			for(let i=0;i<n ;i++){
				j++;
		        if (j == n)
		        {
		            j = 0;
		        }

				if (((square[i][0] < y) && (square[j][0] >= y)) || ((square[j][0] < y) && (square[i][0] >=
            y)))
                {
        			if (parseInt(square[i][1]) + (y - parseInt(square[i][0])) / (parseInt(square[j][0]) - parseInt(square[i][0])) * (parseInt(square[j][1]) -
                parseInt(square[i][1])) < x)
		            {
		                res = !res;
		                console.log(res);
		            }
				}
			}

			return res;
		}
  }

}
