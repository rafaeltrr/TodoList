import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import  Validation  from './scripts/Validation';
import UpdateCard from './scripts/UpdateCards'
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnChanges  {

  Cards: any;
  @Input() BackLog:any;
  @Input() onDevelopment:any;
  @Input() interrupted:any;
  @Input() test:any;
  @Input() production:any;
  @Input() password: any

  async updateCard(direction:string,card:any, unblock:boolean){
    let newCard:any
    if(unblock){
      const resultValidate = Validation(card.unblocked,this.password)
      if(resultValidate){
        newCard = await UpdateCard(direction, card, this.password);
        this.password = ''
      }else{
        
        return false
      }
    }else{
      newCard = await UpdateCard(direction, card);
    }
    
    if(newCard){    
      const source = document.getElementById("card-"+newCard.id);
      const destiny = document.getElementById(newCard.status) 
      destiny && source? destiny.appendChild(source): null;
    }
    return false
  }
 

  ngOnChanges(changes: SimpleChanges) {  
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = chng?.currentValue?.__zone_symbol__value
      let prev = chng?.previousValue?.__zone_symbol__value
      if(cur != prev ){
          if(this.BackLog){
            this.Cards = this.BackLog;
          }
          if(this.onDevelopment){
            this.Cards = this.onDevelopment;
          }
          if(this.interrupted){
            this.Cards = this.interrupted;
          }
          if(this.test){
            this.Cards = this.test;
          }
          if(this.production){
            this.Cards = this.production;
          }
      }
    }
  }
 
  ngOnInit(): void {
    if(this.BackLog){
      this.Cards = this.BackLog;
    }
    if(this.onDevelopment){
      this.Cards = this.onDevelopment;
    }
    if(this.interrupted){
      this.Cards = this.interrupted;
    }
    if(this.test){
      this.Cards = this.test;
    }
    if(this.production){
      this.Cards = this.production;
    }
  }
  
}