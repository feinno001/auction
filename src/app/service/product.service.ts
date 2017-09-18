import {EventEmitter, Injectable} from '@angular/core';
import 'rxjs/Rx'
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ProductService {

  searchEvent:EventEmitter<ProductSearchParams>=new EventEmitter();

  constructor(private http:Http) { }
  /**获取商品列表*/
  public getProducts():Observable<Product[]>{
    return this.http.get('/api/products').map(res=>res.json());
  }

  /**根据ID查询商品*/
  public getProduct(id:number):Observable<Product>{
   // return this.products.find((product)=>product.id==id);
    return this.http.get('/api/product/'+id).map(res=>res.json());
  }


  /**根据ID查询评论*/
   public getCommentsForProductId(id:number):Observable<Comment[]>{
     return this.http.get('/api/product/'+id+"/comments").map(res=>res.json());
   }

  /**获取商品分类 */
  public getAllCategories():string[]{
    return ["电子产品","硬件产品","书类产品","监控产品","健康产品"];
  }

  /**搜索*/
  public search(params:ProductSearchParams):Observable<Product[]>{
    return this.http.get('/api/products',{params:this.encodeParams(params)}).map(res=>res.json());
  }

  private encodeParams(params: ProductSearchParams) {
    for(let key in params){
        if(!params[key]){
            delete params[key];
        }
    }
    return params;
  }
}


/**商品包含的信息*/
export class Product{
  constructor(
    public id: number,
    public title:string,
    public price:number,
    public rating:number,
    public desc:string,
    public categories:Array<string>
  ){}
}

/**评论信息*/
export class Comment{
  constructor(
    public  id:number,
    public  productId:number,
    public  timestamp:string,
    public  user:string,
    public  rating:number,
    public  content:string
  ){}
}


/*** 搜索数据结构*/
export class ProductSearchParams{
  constructor(
    public title:string,
    public price:number,
    public category:string
  ){}
}

