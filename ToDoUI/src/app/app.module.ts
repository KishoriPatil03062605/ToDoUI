import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToDoServiceService } from '../services/to-do-service.service';
import { HttpModule, Http } from '@angular/http';
import { AppComponent } from './app.component';
import { ListPanelComponent } from './list-panel/list-panel.component';
import { StringPipe } from '../services/string.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListPanelComponent,
    StringPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ToDoServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
