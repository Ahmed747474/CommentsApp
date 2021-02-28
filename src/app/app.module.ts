import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

 import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinerService } from './shared/service/spiner.service';
import { SpinerComponent } from './shared/components/spiner/spiner.component';
 import { AlertifyService } from './shared/service/alertify.service';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentsDetailsComponent } from './components/comments/comments-details/comments-details.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './shared/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent, SpinerComponent,CommentsComponent,CommentsDetailsComponent,AddCommentComponent,FooterComponent
  ],
  imports: [
    BrowserModule,
     CoreModule,
    BrowserAnimationsModule,
    FormsModule
    

  ],
  entryComponents: [],

  providers: [SpinerService, AlertifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
