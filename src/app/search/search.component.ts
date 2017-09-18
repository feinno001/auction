import { Title } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public categories:string[];

  formModel:FormGroup;

  constructor(private productService:ProductService) {
    let fb=new FormBuilder();
    this.formModel=fb.group({
      title:['',Validators.minLength(3)],
      price:[null,this.positiveNumberValidator],
      category:['-1']
    });
  }

  ngOnInit() {
    this.categories=this.productService.getAllCategories();
  }

  private positiveNumberValidator(control:FormControl):any{
    if(!control.value){
      return null;
    }

    let price=parseInt(control.value);

    if(price>0){
      return null;
    }else{
      return {positiveNumber:true};
    }
  }

  public onSearch(){
    if(this.formModel.valid){
      this.productService.searchEvent.emit(this.formModel.value);
    }
  }
}
