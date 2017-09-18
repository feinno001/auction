import { Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product, ProductService,Comment} from "../service/product.service";
import {WebSocketService} from "../service/web-socket.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{

  public isWatched:boolean=false;

  public currentBid:number;

  public  product:Product;

  public comments:Comment[];

  public imgUrl='http://placehold.it/820x230';

  private subscripton:Subscription;

  constructor(private routeInfo:ActivatedRoute,private productSerivce:ProductService,private wsService:WebSocketService) { }

  ngOnInit() {
    let productId:number=this.routeInfo.snapshot.params['productId'];
    this.productSerivce.getProduct(productId).subscribe(
      product=> {
        this.product = product;
        this.currentBid = this.product.price;
      }
    );
    this.productSerivce.getCommentsForProductId(productId).subscribe(
      comments=>this.comments=comments
    );
  }

  public watchProduct(){
      if(this.subscripton){
        this.subscripton.unsubscribe();
        this.isWatched=false;
        this.subscripton=null;
      }else{
        this.isWatched=true;
        this.subscripton=this.wsService.createObservableSocket("ws://localhost:8085",this.product.id).subscribe(
          products=>{
            let product=products.find(p=>p.productId===this.product.id);
            this.currentBid=product.bid;
          }
        )
      }
  }
}
