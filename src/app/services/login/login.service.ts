import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {ConstantsService} from '../constants/constants.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private constantsService: ConstantsService) {
  }

  public async login(username: string, password: string) {
    let body = new HttpParams()
        .set('username', username)
        .set('password', password);

    let retValue = null;
    await this.http
        .post(
            'http://' + this.constantsService.SERVER_ADDRESS + this.constantsService.LOGIN,
            body.toString(),
            {
              headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
              responseType: 'text'
            },
        )
        .toPromise()
        .then(response => {
          retValue = response;
        })
        .catch(error => {
          console.log('Errore nel login:');
          console.log(error);
        });
    return retValue;
  }
}
