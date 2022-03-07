import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckComponent } from './deck.component';
import { HandComponent } from '../hand/hand.component';
import { not } from '@angular/compiler/src/output/output_ast';

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

describe('DeckComponent', () => {
  let component: DeckComponent;
  let fixture: ComponentFixture<DeckComponent>;
  let handComp:HandComponent = new HandComponent();
  let handComp2:HandComponent = new HandComponent();
  let expected = '';
  var unshuffledDeck:string[];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    unshuffledDeck = ["AD","AC","AH","AS","2D","2C","2H","2S","3D","3C","3H","3S","4D","4C","4H","4S","5D","5C","5H","5S","6D","6C","6H","6S","7D","7C","7H","7S","8D","8C","8H","8S","9D","9C","9H","9S","TD","TC","TH","TS","JD","JC","JH","JS","QD","QC","QH","QS","KD","KC","KH","KS"];
    handComp.numbers = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    handComp.suits = [0,0,0,0];
    handComp2.numbers = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    handComp2.suits = [0,0,0,0];
    
  });

  it('should create Deck Component', () => {
    expect(component).toBeTruthy();
  });

  it('should draw Card from Deck', () => {
    expect(component.drawCard(unshuffledDeck).length).toEqual(2);
  });

  it('should deal Hands to 2 players', () => {
    expect(component.dealHands(unshuffledDeck, 2).length).toEqual(48);
  });

  it('should have deal Flop Function', () => {
    expect(component.dealFlop(unshuffledDeck).length).toEqual(49);
  });

  it('should have deal Turn Or River Function', () => {
    expect(component.dealOneCard(unshuffledDeck).length).toEqual(51);
  });

  /* 
    compare 2 hands returns 1 if handA is stronger, -1 if handB is stronger
  */
  it('should compare pair Hands properly (same rank)', () => {
    //handComp = new HandComponent();
    var holeCards = ["AS", "AC"];
    handComp.holeCards = holeCards;
    handComp.rankHeirarchy[rankHeirarchyIndex.pair] = true;
    handComp.pokerHandIndependent = holeCards;//hand which can be less than 5 cards...currently doesnt exist for straights and flushes
    handComp.sortedKickerOnly = [10, 9, 8];//a 0-14 number array value based on hand.numbers Index (0 and 14 are ace)
    //handComp2 = new HandComponent();
    var holeCards2 = ["KS", "KC"];
    handComp2.holeCards = holeCards2;
    handComp2.rankHeirarchy[rankHeirarchyIndex.pair] = true;
    handComp2.pokerHandIndependent = holeCards2;
    handComp2.sortedKickerOnly = [10, 9, 8];
    expect(component.compareTwoHands(handComp, handComp2)).toEqual(1);//1 pair same kickers
  });

  it('should compare pair Hands properly (same rank same pair) ', () => {
    //handComp = new HandComponent();
    var holeCards = ["AS", "AC"];
    handComp.holeCards = holeCards;
    handComp.rankHeirarchy[rankHeirarchyIndex.pair] = true;
    handComp.pokerHandIndependent = holeCards;//hand which can be less than 5 cards...currently doesnt exist for straights and flushes
    handComp.sortedKickerOnly = [10, 9, 8];//a 0-14 number array value based on hand.numbers Index (0 and 14 are ace)
    //handComp2 = new HandComponent();
    var holeCards2 = ["AD", "AH"];
    handComp2.holeCards = holeCards2;
    handComp2.rankHeirarchy[rankHeirarchyIndex.pair] = true;
    handComp2.pokerHandIndependent = holeCards2;
    handComp2.sortedKickerOnly = [10, 9, 7];
    expect(component.compareTwoHands(handComp, handComp2)).toEqual(1);//1 pair same kickers
  });

  it('should compare pair Hands properly (same rank same pair same kicker) ', () => {
    //handComp = new HandComponent();
    var holeCards = ["AS", "AC"];
    handComp.holeCards = holeCards;
    handComp.rankHeirarchy[rankHeirarchyIndex.pair] = true;
    handComp.pokerHandIndependent = holeCards;//hand which can be less than 5 cards...currently doesnt exist for straights and flushes
    handComp.sortedKickerOnly = [10, 9, 8];//a 0-14 number array value based on hand.numbers Index (0 and 14 are ace)
    //handComp2 = new HandComponent();
    var holeCards2 = ["AD", "AH"];
    handComp2.holeCards = holeCards2;
    handComp2.rankHeirarchy[rankHeirarchyIndex.pair] = true;
    handComp2.pokerHandIndependent = holeCards2;
    handComp2.sortedKickerOnly = [10, 9, 8];
    expect(component.compareTwoHands(handComp, handComp2)).toEqual(0);
  });

  it('should compare 2pair Hands properly (same rank same pairs kicker Plays) ', () => {
    //handComp = new HandComponent();
    handComp.rankHeirarchy[rankHeirarchyIndex.two_pairs] = true;
    handComp.pokerHandIndependent = ["KH", "KD", "7D", "7H"];//hand which can be less than 5 cards...currently doesnt exist for straights and flushes
    handComp.sortedKickerOnly = [10];//a 0-14 number array value based on hand.numbers Index (0 and 14 are ace)
    //handComp2 = new HandComponent();
    handComp2.rankHeirarchy[rankHeirarchyIndex.two_pairs] = true;
    handComp2.pokerHandIndependent = ["KH", "KD", "7D", "7H"];
    handComp2.sortedKickerOnly = [14];
    expect(component.compareTwoHands(handComp, handComp2)).toEqual(-1);
  });

  it('should compare 2pair Hands properly (same rank dif pairs) ', () => {
    //handComp = new HandComponent();
    handComp.rankHeirarchy[rankHeirarchyIndex.two_pairs] = true;
    handComp.pokerHandIndependent = ["KH", "KD", "7D", "7H"];//hand which can be less than 5 cards...currently doesnt exist for straights and flushes
    handComp.sortedKickerOnly = [10];//a 0-14 number array value based on hand.numbers Index (0 and 14 are ace)
    //handComp2 = new HandComponent();
    handComp2.rankHeirarchy[rankHeirarchyIndex.two_pairs] = true;
    handComp2.pokerHandIndependent = ["JH", "JD", "7D", "7H"];
    handComp2.sortedKickerOnly = [14];
    expect(component.compareTwoHands(handComp, handComp2)).toEqual(1);
  });

  it('should compare Three of a Kind Hands properly (same rank, dif sets) ', () => {
    //handComp = new HandComponent();
    handComp.rankHeirarchy[rankHeirarchyIndex.trips] = true;
    handComp.pokerHandIndependent = ["KH", "KD", "KS"];//hand which can be less than 5 cards...currently doesnt exist for straights and flushes
    handComp.sortedKickerOnly = [10,9];//a 0-14 number array value based on hand.numbers Index (0 and 14 are ace)
    //handComp2 = new HandComponent();
    handComp2.rankHeirarchy[rankHeirarchyIndex.trips] = true;
    handComp2.pokerHandIndependent = ["2H", "2D", "2C"];
    handComp2.sortedKickerOnly = [14,10];
    expect(component.compareTwoHands(handComp, handComp2)).toEqual(1);
  });

  it('should compare Three of a Kind Hands properly (same rank, same set, kicker Plays) ', () => {
    //handComp = new HandComponent();
    handComp.rankHeirarchy[rankHeirarchyIndex.trips] = true;
    handComp.pokerHandIndependent = ["KH", "KD", "KS"];//hand which can be less than 5 cards...currently doesnt exist for straights and flushes
    handComp.sortedKickerOnly = [14,10];//a 0-14 number array value based on hand.numbers Index (0 and 14 are ace)
    //handComp2 = new HandComponent();
    handComp2.rankHeirarchy[rankHeirarchyIndex.trips] = true;
    handComp2.pokerHandIndependent = ["KH", "KD", "KS"];
    handComp2.sortedKickerOnly = [7,6];
    expect(component.compareTwoHands(handComp, handComp2)).toEqual(1);
  });

  it('should compare Full House Hands properly (same rank, dif set) ', () => {
    handComp.rankHeirarchy[rankHeirarchyIndex.quads] = true;
    handComp.pokerHandIndependent = ["6H", "6D", "6S", "2C", "2H"];//hand which can be less than 5 cards...currently doesnt exist for straights and flushes
    handComp.sortedKickerOnly = [];//a 0-14 number array value based on hand.numbers Index (0 and 14 are ace)
    handComp2.rankHeirarchy[rankHeirarchyIndex.quads] = true;
    handComp2.pokerHandIndependent = ["5H", "5D", "5S", "6D", "6S"];
    handComp2.sortedKickerOnly = [];
    expect(component.compareTwoHands(handComp, handComp2)).toEqual(1);
  });

  it('should compare Full House Hands properly (same rank, same set, different boat) ', () => {
    handComp.rankHeirarchy[rankHeirarchyIndex.quads] = true;
    handComp.pokerHandIndependent = ["6H", "6D", "6S", "2C", "2H"];//hand which can be less than 5 cards...currently doesnt exist for straights and flushes
    handComp.sortedKickerOnly = [];//a 0-14 number array value based on hand.numbers Index (0 and 14 are ace)
    handComp2.rankHeirarchy[rankHeirarchyIndex.quads] = true;
    handComp2.pokerHandIndependent = ["6H", "6D", "6C", "AH", "AC"];
    handComp2.sortedKickerOnly = [];
    expect(component.compareTwoHands(handComp, handComp2)).toEqual(-1);
  });

  it('should compare Four of a Kind Hands properly (same quads, kicker Plays) ', () => {
    handComp.rankHeirarchy[rankHeirarchyIndex.quads] = true;
    handComp.pokerHandIndependent = ["KH", "KD", "KS", "KC"];//hand which can be less than 5 cards...currently doesnt exist for straights and flushes
    handComp.sortedKickerOnly = [8];//a 0-14 number array value based on hand.numbers Index (0 and 14 are ace)
    handComp2.rankHeirarchy[rankHeirarchyIndex.quads] = true;
    handComp2.pokerHandIndependent = ["KH", "KD", "KS", "KC"];
    handComp2.sortedKickerOnly = [7];
    expect(component.compareTwoHands(handComp, handComp2)).toEqual(1);
  });

  it('should compare Four of a Kind Hands properly (same rank, dif quads) ', () => {
    handComp.rankHeirarchy[rankHeirarchyIndex.quads] = true;
    handComp.pokerHandIndependent = ["6H", "6D", "6S", "6C"];//hand which can be less than 5 cards...currently doesnt exist for straights and flushes
    handComp.sortedKickerOnly = [13];//a 0-14 number array value based on hand.numbers Index (0 and 14 are ace)
    handComp2.rankHeirarchy[rankHeirarchyIndex.quads] = true;
    handComp2.pokerHandIndependent = ["KH", "KD", "KS", "KC"];
    handComp2.sortedKickerOnly = [6];
    expect(component.compareTwoHands(handComp, handComp2)).toEqual(-1);
  });

  it('should compare Flush Hands properly ', () => {
    handComp.rankHeirarchy[rankHeirarchyIndex.flush] = true;
    handComp.pokerHandIndependent = ["AH", "KH", "6H", "5H", "4H"];//hand which can be less than 5 cards...currently doesnt exist for straights and flushes
    handComp2.rankHeirarchy[rankHeirarchyIndex.flush] = true;
    handComp2.pokerHandIndependent = ["AH", "KH", "QH", "5H", "4H"];
    expect(component.compareTwoHands(handComp, handComp2)).toEqual(-1);
  });

  it('should compare Flush Hands properly2 ', () => {
    handComp.rankHeirarchy[rankHeirarchyIndex.flush] = true;
    handComp.pokerHandIndependent = ["4H", "5H", "6H", "KH", "AH"];//hand which can be less than 5 cards...currently doesnt exist for straights and flushes
    handComp2.rankHeirarchy[rankHeirarchyIndex.flush] = true;
    handComp2.pokerHandIndependent = ["4H", "5H", "QH", "KH", "AH"];
    expect(component.compareTwoHands(handComp, handComp2)).toEqual(-1);
  });

  it('should get Hand Winner', () => {
    expect(component.getHandWinner).toBeTruthy();
  });

  it('should rank Hands properly', () => {
    expect(component.rankHand).toBeTruthy();
  });

  it('should raise Amount Correctly', () => {
    expect(component.raiseAmount).toBeTruthy();
  });

  it('should identify a flush', () => {
    //create a hand compoent
    //pass into deskIsFlush
    //check rank == isFlush
    //handComp = new HandComponent();
    var holeCards = ["AC", "KC"];
    handComp.holeCards = holeCards;
    handComp.suits[1] = 5;
    component.isFlush(handComp);
    expect(handComp.rank).toEqual("Flush");
  });

  it('should identify Quads', () => {
    //handComp = new HandComponent();
    var holeCards = ["2C", "2H"];
    handComp.holeCards = holeCards;
    handComp.numbers[1] = 4;
    component.isFourOfAKind(handComp);
    expect(handComp.rank).toEqual("Four of A Kind");
  });

  it('should identify a full house', () => {
    //handComp = new HandComponent();
    var holeCards = ["2C", "2H"];
    handComp.holeCards = holeCards;
    handComp.numbers[1] = 3;
    handComp.numbers[2] = 2;
    component.isFullHouse(handComp);
    expect(handComp.rank).toEqual("Full House");
    });

  it('should identify a pair', () => {
    handComp = new HandComponent();
    var holeCards = ["2C", "2H"];
    handComp.holeCards = holeCards;
    handComp.numbers[1] = 2;
    component.isPair(handComp);
    expect(handComp.rank).toEqual("Pair");
    });
  it('should identify a straight', () => {
    //handComp = new HandComponent();
    var holeCards = ["2C", "2H"];
    handComp.holeCards = holeCards;
    handComp.numbers[1] = 1;
    handComp.numbers[2] = 1;
    handComp.numbers[3] = 1;
    handComp.numbers[4] = 1;
    handComp.numbers[5] = 1;
    component.isStraight(handComp);
    expect(handComp.rank).toEqual("Straight");
  });


  it('should identify trips', () => {
    //handComp = new HandComponent();
    var holeCards = ["2C", "2H"];
    handComp.holeCards = holeCards;
    handComp.numbers[1] = 3;
    component.isThreeOfAKind(handComp);
    expect(handComp.rank).toEqual("Three of a Kind");
    });
  it('should identify 2 pair', () => {
    //handComp = new HandComponent();
    var holeCards = ["2C", "2H"];
    handComp.holeCards = holeCards;
    handComp.numbers[1] = 2;
    handComp.numbers[2] = 2;
    component.isTwoPair(handComp);
    expect(handComp.rank).toEqual("Two Pair");
  });








  // it('should identify a straight flush', () => {
  //   handComp = new HandComponent();
  //   var holeCards = ["2C", "2H"];
  //   handComp.holeCards = holeCards;
  //   handComp.numbers[1] = 1;
  //   handComp.numbers[2] = 1;
  //   handComp.numbers[3] = 1;
  //   handComp.numbers[4] = 1;
  //   handComp.numbers[5] = 1;
  //   component.isStraightFlush(handComp);
  //   expect(handComp.rank).toEqual("Straight Flush");
  // });
  // it('should not classify as straight flush if it is a straight and a flush separately', () => {
  //   handComp = new HandComponent();
  //   var holeCards = ["2C", "2H"];
  //   handComp.holeCards = holeCards;
  //   handComp.numbers[1] = 1;
  //   handComp.numbers[2] = 1;
  //   handComp.numbers[3] = 1;
  //   handComp.numbers[4] = 1;
  //   handComp.numbers[5] = 1;
  //   component.isStraightFlush(handComp);
  //   expect(handComp.rank).not.toEqual("Straight Flush");
  // });
});
