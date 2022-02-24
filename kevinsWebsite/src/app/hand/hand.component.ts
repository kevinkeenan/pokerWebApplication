import { Component, OnInit } from '@angular/core';

  enum rankHeirarchyIndex {
    royal_flush = 9,
    straight_flush = 8,
    quads = 7,
    full_house = 6,
    flush = 5,
    straight = 4,
    trips= 3,
    two_pairs= 2,
    pair=1,
    high_card= 0,
  };

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit {

  holeCards: string [] = [];//2cards
  sevenCards:string [] =[];//2cards+sharedboard

  firstCardImageString: string = "";
  secondCardImageString: string = "";
  

  pokerHandIndependent:string [] =[];//hand which can be less than 5 cards
  cardsLeft:string [] =[];//cards to choose kicker from
  sortedKickerOnly:number [] =[];//sortedValuesOfKickers...really these are numbers
  bestFiveCardCombination: string [] = [];
  isWinner: boolean = false;
  isLive: boolean = true;
  hasRank: boolean = false;
  //begin hand rank solution
  //there is no heirarchy established here
  ranks = {
    royal_flush: false,
    straight_flush: false,
    quads: false,
    full_house: false,
    flush: false,
    straight: false,
    trips: false,
    two_pairs: false,
    pair: false,
    high_card: false,
  };
  rankHeirarchy: boolean[] = [false, false, false,false, false,false, false,false, false,false, false,false ];
  rank: string = "holderVal";
  suits: number[] = [0,0,0,0];
  numbers: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];//need a low ace

  constructor() { }

  ngOnInit(): void {
  }


  
}
