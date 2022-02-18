import { Directive, ElementRef, HostListener } from '@angular/core';
//import {StartGameService}
import { DeckComponent } from './deck/deck.component';
import {AppComponent} from './app.component';

@Directive({
  selector: '[appRaiseAmount]'
})
export class RaiseAmountDirective {

  constructor(private ele: ElementRef, private deck2: DeckComponent, private ac: AppComponent) { }

  @HostListener('click') onMouseClick()
  {

    // var soundFile = document.createElement("audio");
    // soundFile.preload = "auto";

    // //Load the sound file (using a source element for expandability)
    // var src = document.createElement("source");
    // src.src = fileName + ".mp3";
    // soundFile.appendChild(src);


    var slider = this.ele.nativeElement;
    var amt = 0;
    var playerTurn = this.deck2.playerTurn;
    //console.log(slider.id)
    if(slider.id == 'raiseSlider')
    {
      //console.log(slider.innerHTML);
      amt = parseInt(slider.innerHTML);
      //console.log(amt);
    }
    else
    {
      //get pot amount
      var pot = this.deck2.pot;
      if(slider.id == 'raiseOneThird')
      {
        amt = Math.round(pot/3 * 100)/100;
      }
      else if (slider.id == 'raiseOneHalf')
      {
        amt = Math.round(pot/2 * 100)/100;
      }
      else if (slider.id == 'raisePot')
      {
        amt = pot;
      }
    }
    this.deck2.raiseAmount(amt, playerTurn);
  }

  @HostListener('mouseleave') onMouseLeave()
  {
    this.ele.nativeElement.style.color = 'black';
  }
  @HostListener('mouseenter') onMouseEnter()
  {
    this.ele.nativeElement.style.cursor = "pointer";
    this.ele.nativeElement.style.color = 'black';
  }

}
