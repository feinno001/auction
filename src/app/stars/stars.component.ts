import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit,OnChanges{


  @Input()
  public rating:number=0;

  @Output()
  public ratingChange:EventEmitter<number>=new EventEmitter();

  public stars:boolean[];

  @Input()
  private readOnly:boolean=true;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.stars=[];
    for(let i=1;i<=5;i++){
      this.stars.push(i>this.rating);
    }
  }

  public clickStar(index:number){
    if(!this.readOnly){
      this.rating=index+1;
      this.ratingChange.emit(this.rating);
    }
  }
}
