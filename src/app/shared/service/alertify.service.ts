import { Injectable } from '@angular/core';
declare var alertify: any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }
/**
 * Confirms alertify service
 * @param message 
 * @param okCallback 
 */
confirm(message: string , okCallback: () => any) {
  alertify.confirm(message, function(e) {
    if (e) {
      okCallback();
    } else {
    }
  });
}
/**
 * Success alertify service
 * @param message 
 */
success(message: string) {
  alertify.success(message);
}
/**
 * Errors alertify service
 * @param message 
 */
error(message: string) {
  alertify.error(message);
}
/**
 * Warning alertify service
 * @param message 
 */
warning(message: string) {
  alertify.warning(message);
}
/**
 * Messages alertify service
 * @param message 
 */
message(message: string) {
  alertify.message(message);
}

}
