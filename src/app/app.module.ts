import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { StarsComponent } from './stars/stars.component';
import { ProductComponent } from './product/product.component';
import { SearchComponent } from './search/search.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from "@angular/router";
import {ProductService} from "./service/product.service";
import { CommentComponent } from './comment/comment.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FilterPipe } from './pipe/filter.pipe';
import {HttpModule} from "@angular/http";
import {WebSocketService} from "./service/web-socket.service";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

const routeConfig:Routes=[
  {path:'',component:HomeComponent},
  {path:'product/:productId',component:ProductDetailComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    StarsComponent,
    ProductComponent,
    SearchComponent,
    CarouselComponent,
    ProductDetailComponent,
    HomeComponent,
    CommentComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routeConfig),
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  providers: [ProductService,WebSocketService,{
  provide:LocationStrategy,useClass:HashLocationStrategy
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
