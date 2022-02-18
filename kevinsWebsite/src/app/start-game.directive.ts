import { Directive, ElementRef, HostListener } from '@angular/core';
//import {StartGameService}
import { DeckComponent } from './deck/deck.component';
import {AppComponent} from './app.component';

@Directive({
  selector: '[appStartGame]'
})
export class StartGameDirective {

  constructor(private ele: ElementRef, public deck2: DeckComponent, private ac: AppComponent) { }

  @HostListener('click') onMouseClick()
  {
    var numPlayers = 2;
    var deck = this.ele.nativeElement;
    console.log('inside dirrective');
    var shuffledDeck = this.deck2.shuffleDeck();
    var hands = this.deck2.dealHands(shuffledDeck, numPlayers);
    this.deck2.deck = hands;
    this.deck2.player1Chips = 199;
    this.deck2.player2Chips = 198;
    this.deck2.pot = 3;
    this.deck2.playerTurn = 1;
    //console.log('hands' + hands)
  }

  @HostListener('mouseleave') onMouseLeave()
  {
    this.ele.nativeElement.style.color = 'black';
    this.deck2.testDeckLengthMethod;
  }
  @HostListener('mouseenter') onMouseEnter()
  {
    this.ele.nativeElement.style.cursor = "pointer";
    this.ele.nativeElement.style.color = 'black';
  }
}
