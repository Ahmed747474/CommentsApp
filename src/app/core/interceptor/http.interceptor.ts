import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpHeaders,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = req.clone({
            headers: new HttpHeaders({
                'x-mock-response-code': '200',
                'x-api-key': environment.key,
                'x-mock-response-name': 'dynamic'
            })
        });

        return next.handle(authReq);
    }
}
export const HttpConfigInterceptors = {
    provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true
};