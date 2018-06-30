import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Api } from '../api/api';
import { UserProvider } from '../user/user';



@Injectable()
export class AuthService {
    // currentUser: UserProvider;
    constructor(private api: Api, private storage: Storage, public currentUser: UserProvider) {}

    public login(credentials) {
        if (credentials.email === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        } else {
            return Observable.create(observer => {
                let access = 'fail';
                // At this point make a request to your backend to make a real check!
                this.api.post('login', credentials)
                .map(res => res.json())
                .subscribe( data => {
                    console.log('login response ',data);
                    data.login_type = 'agribridge';
                    console.log('new response ',data);

                    //store data in storage
                    if (data.success == true) {
                        
                        console.log('data.data',data.data);
                        this.storage.set('user_data', data.data);
                        this.currentUser.setUser(
                                data.data.id,
                                data.data.fname,
                                data.data.userType,
                                data.data.token,
                                data.data.contactno,
                                data.data.token_expiry
                        );
                        access = 'success';
                    }
                    else{
                        access = 'fail';
                    }
                    observer.next(access);
                    observer.complete();
                    console.log(data);
                }, error => {
                    observer.next('error');
                });
            });
        }
    }

    public isAuthenticated(){
        
        return new Observable(observer => {
            //check if token is not expired
            this.storage.get('user_data').then(val => {
                if(val){
                    console.log('val.id : ',val.id);
                    console.log('val.fname : ',val.fname);
                    console.log('val.emailId : ',val.emailId);
                    console.log('val.userType : ',val.userType);
                    console.log('val.token : ',val.token);
                    console.log('val.contactno : ',val.contactno);
                    console.log('val.token_expiry : ',val.token_expiry);
                    console.log('val.login_type : ',val.login_type);

                    this.currentUser.setUser(
                            val.id,
                            val.fname,
                            val.userType,
                            val.token,
                            val.contactno,
                            val.token_expiry,
                    );
                    
                    let enddate = new Date(this.currentUser.token_expiry);
                    let now = new Date();

                    // if(now.getTime() > enddate.getTime()){
                    //     console.log('false');
                    //     observer.next(false);
                    // }
                    // else{
                        console.log('yes authenticated true');
                        observer.next(true);
                    // }
                }
                else{
                    observer.next(false);
                }
                observer.complete();
            });
        });
    }

    public getUserInfo() : UserProvider {
        return this.currentUser;
    }

    public logout() {
        return new Observable(observer => {
            // this.currentUser = null;
            this.storage.remove('user_data');
            observer.next(true);
            observer.complete();
        });
    }
}