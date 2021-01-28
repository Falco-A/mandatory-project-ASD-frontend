import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  public readonly PROTOCOL = 'http://';
  public readonly SERVER_ADDRESS = '';
  public readonly LOGIN = "/login.php";
  public readonly HTTP_ACCESS_SUCCESS = 'ACCESS_SUCCESS';
  public readonly HTTP_ACCESS_FAILURE = 'ACCESS_FAILURE';
}
