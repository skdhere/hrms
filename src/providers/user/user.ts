import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

    id: string = '';
    fname: string = '';
    emailId: string = '';
    userType: string = '';
    token: string = '';
    contactno: string = '';
    token_expiry: string = '';
    login_type: string = '';

    constructor(private storage: Storage){
    	this.storage.get('user_data').then(val => {
            if(val){
                this.setUser(
                    val.id,
                    val.fname,
                    val.userType,
                    val.token,
                    val.contactno,
                    val.token_expiry,
                    val.login_type
                );
            }
        });
    }
    
    public setUser(id: string, name: string,userType: string, token: string, contactno: string, token_expiry: string, login_type: string ="") {
        this.id = id;
        this.fname = name;
        this.userType = userType;
        this.token = token;
        this.contactno = contactno;
        this.token_expiry = token_expiry;
        this.login_type   = login_type;
    }

}