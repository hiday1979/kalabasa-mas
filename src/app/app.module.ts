import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AbuteComponent } from './abute/abute.component';
import { FotterComponent } from './fotter/fotter.component';
import { HeaderComponent } from './header/header.component';
import { MainPicComponent } from './main-pic/main-pic.component';
import { DragulaModule } from 'ng2-dragula';
import { MyServiceService} from './my-service.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AbuteComponent,
    FotterComponent,
    HeaderComponent,
    MainPicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragulaModule,
    BrowserAnimationsModule
  ],
  providers: [MyServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
