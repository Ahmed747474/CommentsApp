import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HttpConfigInterceptors } from './interceptor/http.interceptor';
import { Base_Remote_ApiUrl } from 'src/config/defaultss.config';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiUrlInterceptor } from './interceptor/apiurl.interceptor';
import { CommentsRequestsService } from './service/comments-requests.service';
 @NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
 

  ],
  providers:[HttpConfigInterceptors,     
     { provide: Base_Remote_ApiUrl, useFactory: getRemoteApiUrl },
    {  provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true, deps: [Base_Remote_ApiUrl]},
    CommentsRequestsService,
 ],
  declarations: []
})
export class CoreModule { }
export function getRemoteApiUrl() {
  return environment.baseRemoteApiUrl ;
}
