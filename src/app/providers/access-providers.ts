/* eslint-disable @typescript-eslint/semi */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */






import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';


@Injectable()
export class AccessProviders{
  server = 'http://localhost/api/';

  constructor(
    public http: HttpClient
  ) { }
  postData(body, file){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'

    });
    const options = {
      headers: headers

    }

    return this.http.post(this.server + file, JSON.stringify(body), options).map(res => res).timeout(59000);
  }

}
