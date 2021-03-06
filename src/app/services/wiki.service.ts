import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable() 
  export class WikiService{
    TC_ID: string = '5963b498f67e6315b7658a2a';
    baseUrl: string = 'https://api.wikitude.com';
    path_add_get_target:string = '/cloudRecognition/targetCollection/' + this.TC_ID + '/target/';
    path_generate_TC: string = '/cloudRecognition/targetCollection/' + this.TC_ID + '/generation/wtc';
    headers: any = new Headers({
        'Content-Type': 'application/json',
	    'X-Token': 'fe087579ece1518a3a67dae3021888c7',
	    'X-Version': 3
      });

    constructor(private http: Http) {
      
    }
    
    getAllTargets() {
      console.log('Clicked get all Targets');
      return this.http.get(this.baseUrl + this.path_add_get_target, { headers: this.headers})
        .map((res) => res.json());
    }
    // {name: 'name of target', imageUrl: 'filestack'}
    addTarget(target) {
        let body = JSON.stringify(target);
        console.log(body, 'target info')
        return this.http.post(this.baseUrl + this.path_add_get_target, body, { headers: this.headers })
          .map((res) => {
            // console.log(res, 'res from server')
            res.json()
          });
    }
    
    deleteTarget(targetId) {
        console.log('target id = ', targetId)
        let path = this.baseUrl + this.path_add_get_target + targetId;
        console.log('path = ', path)


        return this.http.delete(path, { headers: this.headers })
          .map((res) => res.json());
    }

    generateTargetCollection() {
      console.log(this.baseUrl + this.path_generate_TC, 'url to send');
        return this.http.post(this.baseUrl + this.path_generate_TC, { sdkVersion: "6.0" }, { headers: this.headers })
          .map((res) => {
            // console.log(res)
            res.json()
          } );
    }
  }

