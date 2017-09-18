import {Component, Input, OnInit} from '@angular/core';
import {ProductService, Comment, Product} from "../service/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
 
  @Input()
  public comments:Comment[];

  public newRating:number=5;

  public newComment:string='';

  public imgUrl='http://placehold.it/820x230';

  public isCommentHide:boolean=true;

  @Input()
  public product:Product;

  constructor(private routeInfo:ActivatedRoute,private productSerivce:ProductService) { }

  ngOnInit() {
  }
  /**增加评论 */
  public addComment(){
    let comment=new Comment(0,this.routeInfo.snapshot.params['productId'],new Date().toISOString(),'someone',this.newRating,this.newComment);
    this.comments.unshift(comment);

    let sum=this.comments.reduce((sum,comment)=>sum+comment.rating,0);
    this.product.rating=sum/this.comments.length;
    this.newRating=5;
    this.newComment=null;
    this.isCommentHide=true;
  }

}
