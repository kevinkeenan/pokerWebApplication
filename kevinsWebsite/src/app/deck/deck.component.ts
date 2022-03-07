import { Component, OnInit } from '@angular/core';
import { StartGameDirective } from '../start-game.directive';
import { HandComponent } from '../hand/hand.component';

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
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  //var deck: string[];
  deck: string [] = ["AD","AC","AH","AS","2D","2C","2H","2S","3D","3C","3H","3S","4D","4C","4H","4S","5D","5C","5H","5S","6D","6C","6H","6S","7D","7C","7H","7S","8D","8C","8H","8S","9D","9C","9H","9S","TD","TC","TH","TS","JD","JC","JH","JS","QD","QC","QH","QS","KD","KC","KH","KS"];
  values: string [] = ['A','2','3','4','5','6','7','8','9','T','J','Q','K','A']
  board: string [] = [];
  pot: number = 0;
  timeRemaining: number = 15;
  player1Chips: number = 0;
  player2Chips: number = 0;
  player3Chips: number = 0;
  player4Chips: number = 0;
  player5Chips: number = 0;
  player1Card: string = "";
  player2Card: string = "";
  player3Card: string = "";
  player4Card: string = "";
  player5Card: string = "";
  player1Card2: string = "";
  player2Card2: string = "";
  player3Card2: string = "";
  player4Card2: string = "";
  player5Card2: string = "";
  boardCards: string [] = [];  
  playerTurn: number = 1;
  totalNumberOfPlayers: number = 2;
  bettingRound: number = 0;
  isActionFinished: boolean = true;
  //begin hand rank solution
 NUM_CARDS_IN_DECK = 52;
 NUM_VALUES_IN_DECK = 13;
 NUM_SUITS_IN_DECK = 4;
 NUM_CARDS_IN_HAND = 5;
 ACE_VALUE = Math.pow(2, 13);
 STRAIGHT_LOW_ACE_INDICATOR = parseInt("10000000011110", 2);
 TEN_CARD_POSITION = 8;
 RANK_BASE_VALUE = Math.pow(10, 9);
 handArray:HandComponent[] = [];

  constructor() { }

  
  ngOnInit(): void {

  }

  drawCard(shuffledDeck: string []):string {
    const card = shuffledDeck.shift();
    if(card == null)
    {
      return "";
    }
    console.log("card drawn " + card);
    return card;
  }

  /*
  Fischer Yates shuffle with O(n) performance
  https://bost.ocks.org/mike/shuffle/ 
  */
  shuffleDeck():string[] 
  {
    this.printDeck(this.deck);
    // if(!unshuffledDeck)
    // {
    //   unshuffledDeck = this.deck;
    // }
      var copy = [], n = this.deck.length, i;
    
      // While there remain elements to shuffle…
      while (n) {
    
        // Pick a remaining element…
        i = Math.floor(Math.random() * n--);
    
        // And move it to the new array.
        copy.push(this.deck.splice(i, 1)[0]);
      }
    this.printDeck(copy);

    return copy;
  }

  dealHands(shuffledDeck: string[], numberOfPlayers: number): any[]{
    console.log('dealing cards to ' + numberOfPlayers + ' players');
    var playersfirstCard:string[] = [];
    var playersSecondCard: string[] = [];
    var j:number = 1;
    //var i = 0;

    for(j; j < 3; j++)//every player gets one card...then every player gets a second card
    {
      //console.log('j' + j)
      for(var i: number = 0;i < 2; i++)//here 2 is the number of players
      {
        var card= this.drawCard(shuffledDeck);
        //this.printDeck(shuffledDeck);
        if(j==1)
        {
          //on only the first go around create a hand and push to array
          console.log('player'+ j +'hand');
          //var hand1 = document.getElementById('player'+ (j) +'hand')! as unknown as HandComponent;//new HandComponent();
          var hand1 = new HandComponent();
          this.handArray.push(hand1);//push to global array so it can be referenced by counter instead of hand + inc
          console.log('dealing first card');
          playersfirstCard.push(card);
          this.handArray[i].holeCards.push(card);
        }
        else if(j==2)
        {
          console.log('dealing second card');
          playersSecondCard.push(card);
          this.handArray[i].holeCards.push(card);
        }
      }
      this.playCardDealSound();
    }
    //this.printDeck(playersfirstCard);
    //this.printDeck(playersSecondCard);
    this.printDeck(this.handArray[0].holeCards);

    this.loadCardImages(this.handArray[0].holeCards, 1);
    this.loadCardImages(this.handArray[1].holeCards, 2);
    return shuffledDeck;
  }

  dealFlop(shuffledDeck: string[]): any[]{
    console.log('dealing flop');
    var flop:string[] = [];
    var j = 0;
    //var i = 0;
    for(j; j < 3; j++)//every player gets one card...then every player gets a second card
    {
      var card= this.drawCard(shuffledDeck);
      flop.push(card);
      this.board.push(card);
    }
    this.printDeck(flop);
    //var playersHands = playersfirstCard.map((e, i) => [e, playersSecondCard[i]]);
    //console.log('length of deck' + shuffledDeck.length)
    this.loadCardImages(this.board, 0);

    var playersHands: any[] = [];
    this.playCardDealSound();
    return shuffledDeck;
  }
  
  dealOneCard(shuffledDeck: string[]): any[]{
    console.log('dealing turn or River');
    var turnOrRiver:string[] = [];
    var card= this.drawCard(shuffledDeck);
    turnOrRiver.push(card);
    this.board.push(card);
    
    this.printDeck(turnOrRiver);
    var playersHands: any[] = [];
    this.loadCardImages(turnOrRiver, 0);
    this.playCardDealSound();

    return shuffledDeck;
  }

  resetDeck(unshuffledDeck: string []):string[] {
    this.deck = ["AD","AC","AH","AS","2D","2C","2H","2S","3D","3C","3H","3S","4D","4C","4H","4S","5D","5C","5H","5S","6D","6C","6H","6S","7D","7C","7H","7S","8D","8C","8H","8S","9D","9C","9H","9S","TD","TC","TH","TS","JD","JC","JH","JS","QD","QC","QH","QS","KD","KC","KH","KS"];
    //console.log("Shuffled deck" + unshuffledDeck);
    return unshuffledDeck;
  }

  raiseAmount(amount: number, turn: number)
  {
    console.log(this.player1Card);
    console.log(this.player1Card2);
    
    //check if player has enough chips
    //do i need to pass in player turn or can i just reference 
    console.log('amount before' + amount);
    console.log('Player' + turn + ' turn to bet');
    var player = 'player' + turn + 'Chips';
    //var playerChips = 0;
    //console.log('type ' + document.getElementById(player)!.nodeType);
    //console.log('playerChips Before ' + document.getElementById(player)!.innerHTML);
    
    var playerChips = parseInt(document.getElementById(player)!.innerHTML);
    //console.log('playerChips after ' + playerChips);
    //console.log('amount after' + amount);

    //if playerchips is less than amount...then bet the remaining playerchips 
    if(playerChips < amount)
    {
      var newChipValue = this.getPlayerChips(turn);
      this.pot += playerChips;
      console.log("raised " + playerChips);
      newChipValue = 0;
      playerChips = 0;
      document.getElementById(player)!.innerHTML = newChipValue.toString();
    }
    else
    {
      var newChipValue = this.getPlayerChips(turn);
      this.pot += amount;
      console.log("raised " + amount);
      newChipValue -= amount;
      document.getElementById(player)!.innerHTML = newChipValue.toString();//change ui value to display new lower player chip value
      //this.player1Chips = newChipValue;
    }

    this.timeRemaining = 15;
    //this is faulty
    //i will need to rework when playerTurn is reset...for now always move from player 1 and end on player 2
    if(this.playerTurn == this.totalNumberOfPlayers) //action can be finished when it does not equal the last player
    {
      this.playerTurn = 1;
      this.bettingRound++;
      this.isActionFinished = true;
    }
    else
    {
      this.playerTurn++;
      //this.isActionFinished = false;
      //TODO: now prompt to call or fold or raise
      //if call do nothing
      //if fold end hand
      //if raise set playerTurn = 1
    }
    console.log('betting round is' + this.bettingRound);

    if(this.bettingRound == 1 && this.isActionFinished)//deal flop
    {
      this.dealFlop(this.deck);
      this.isActionFinished = false;//reset action after dealing
    }
    else if ((this.bettingRound == 2 || this.bettingRound == 3) && this.isActionFinished)//deal turn or River
    {
      this.dealOneCard(this.deck);
      this.isActionFinished = false;//reset action after dealing
    }
    else if(this.bettingRound == 4 && this.isActionFinished)
    {
      //determine hand strength and pot winner
      //filter the this.handArray to only include those where handArray[i].isLive = true
      console.log("shared 5 cards are");
      this.printDeck(this.board);
      console.log("Hand A hole cards");
      this.printDeck(this.handArray[0].holeCards);
      console.log("Hand B hole cards");
      this.printDeck(this.handArray[1].holeCards);

      this.getHandWinner(this.handArray);



      // console.log("hand B rank " + this.handArray[1].rank.toString());

      // console.log("Hand A best Hand");
      // this.printDeck(this.handArray[0].bestFiveCardCombination);
      // console.log("hand a rank " + this.handArray[0].rank);
      // console.log("Hand B best Hand");
      // this.printDeck(this.handArray[1].bestFiveCardCombination);


      //window.alert("hand is over");
    }

  }

  /*
    look through an array of hands that have not folded and return the best one
    how can i then determine ehich player had which hand
  */
  getHandWinner(remainingHands: HandComponent[])
  {
    for(var i = 0; i < remainingHands.length; i++)
    {
      //call rank hand on each hand
      this.rankHand(remainingHands[i], this.board);
    }

    var highestRank = 0;
    for(var j = 0; j < 1; j++)//for now only compare 2 hands
    {
      console.log("comparing hand A: "  + remainingHands[j].rank);
      this.printDeck(remainingHands[j].bestFiveCardCombination);
      console.log("against hand B: " + remainingHands[j+1].rank);
      this.printDeck(remainingHands[j+1].bestFiveCardCombination);
      highestRank = this.compareTwoHands(remainingHands[j], remainingHands[j+1])
      if(highestRank ==1)
      {
        remainingHands[j].isWinner = true;
        console.log("Hand A is the Winner " + remainingHands[j].bestFiveCardCombination.toString());
      }
      else if(highestRank == -1)
      {
        remainingHands[j+1].isWinner = true;
        console.log("Hand B is the Winner "+ remainingHands[j+1].bestFiveCardCombination);
      }
      else
      {
        console.log("Its a tie "+remainingHands[j].bestFiveCardCombination.toString() + remainingHands[j+1].bestFiveCardCombination.toString());
      }
      //play sound for pushing pot
    }
    //compareHands function pass in remaining Hands...loop thru them...check hand rank


    //assign isWinner
    //add pot amount to winning player
    //display winner message
    //reset pot
  }

  /*

    if Hand A is stronger return 1
    if Hand B is stronger return -1
    if equal return 0
  */
  compareTwoHands(handA:HandComponent, handB:HandComponent):number
  {
    if(handA.rankHeirarchy.indexOf(true) > handB.rankHeirarchy.indexOf(true))
    {
      return 1;
    }
    else if(handA.rankHeirarchy.indexOf(true) < handB.rankHeirarchy.indexOf(true))
    {
      return -1;
    }
    else 
    {
      console.log("Hands are the same rank");
      console.log(handA.rank);
      console.log(handB.rank);
      //rank the pairs, flushes, themselves
      //TODO
      //i will need to make sure that pokerHandIndpendent is sorted on values 
      //so a flush and straight will compare highest kickers
      //pairs do not matter as much
      //full houses need to compare 3 of a kind first


      for(var j = 0; j < handA.pokerHandIndependent.length; j++)//if same hand rank they will have the same length within poker hand type ie pair = 2
      {
        //is the numbered Inedx Value of 13 different cards higher in one hand...is one pair higher than another?
        if(this.values.lastIndexOf(handA.pokerHandIndependent[j].charAt(0)) > this.values.lastIndexOf(handB.pokerHandIndependent[j].charAt(0))) //here we have array of string of cards, but we dont give a fuck about the suit
        {
          return 1;
        }
        else if(this.values.lastIndexOf(handA.pokerHandIndependent[j].charAt(0)) < this.values.lastIndexOf(handB.pokerHandIndependent[j].charAt(0)))
        {
          return -1;
        }
        else
        {
          //value within the poker hand itslef is the same...continue
          continue;
        }
      }

      //rank the kickers
      for(var i = 0; i < handA.sortedKickerOnly.length; i++)//if same hand rank they will have the same number of kickers
      {
        if(handA.sortedKickerOnly[i] > handB.sortedKickerOnly[i])
        {
          return 1;
        }
        else if(handA.sortedKickerOnly[i] < handB.sortedKickerOnly[i])
        {
          return -1;
        }
      }
      
      return 0;//chop it up
    }
  }

  /*
  passes in an array of 7 'cards' strings of values and suits
  creates arrays to extract frequencies of numbers and suits
  */
  rankHand(hand:HandComponent, board: string[]):number
  {
    var sevenCards = board.concat(hand.holeCards);
    for(var i = 0; i < sevenCards.length; i++)
    {
      //exit out to save time if there are 3 different suits
      if(sevenCards[i].charAt(1) == 'D')
      {
        //how to map to different array
        //want to incrase suit[0] when char at 1 is D
        hand.suits[0]++;
      }
      else if(sevenCards[i].charAt(1) == 'C')
      {
        hand.suits[1]++;
      }
      else if(sevenCards[i].charAt(1) == 'H')
      {
        hand.suits[2]++;
      }
      else if(sevenCards[i].charAt(1) == 'S')//else could save some time
      {
        hand.suits[3]++;
      }
      if(sevenCards[i].charAt(0) == 'A')
      {
        hand.numbers[0]++;
        hand.numbers[13]++;
      }
      else if(sevenCards[i].charAt(0) == '2')
      {
        hand.numbers[1]++;
      }
      else if(sevenCards[i].charAt(0) == '3')
      {
        hand.numbers[2]++;
      }
      else if(sevenCards[i].charAt(0) == '4')
      {
        hand.numbers[3]++;
      }
      else if(sevenCards[i].charAt(0) == '5')
      {
        hand.numbers[4]++;
      }
      else if(sevenCards[i].charAt(0) == '6')
      {
        hand.numbers[5]++;
      }
      else if(sevenCards[i].charAt(0) == '7')
      {
        hand.numbers[6]++;
      }
      else if(sevenCards[i].charAt(0) == '8')
      {
        hand.numbers[7]++;
      }
      else if(sevenCards[i].charAt(0) == '9')
      {
        hand.numbers[8]++;
      }
      else if(sevenCards[i].charAt(0) == 'T')
      {
        hand.numbers[9]++;
      }
      else if(sevenCards[i].charAt(0) == 'J')
      {
        hand.numbers[10]++;
      }
      else if(sevenCards[i].charAt(0) == 'Q')
      {
        hand.numbers[11]++;
      }
      else if(sevenCards[i].charAt(0) == 'K')
      {
        hand.numbers[12]++;
      }
    }
    hand.sevenCards = sevenCards;

    this.isStraightFlush(hand);
    if(!hand.hasRank)
    {
      console.log("not straight flush...in evaluate quads");
      //mark a hand class as type straighflush and return which 5 cards it is
      hand.bestFiveCardCombination = this.isFourOfAKind(hand);
      console.log("here after returning null")
    }
    if(!hand.hasRank)
    {
      console.log("not quads...in evaluate boat");

      hand.bestFiveCardCombination = this.isFullHouse(hand);
    }
    if(!hand.hasRank)
    {
      console.log("not boat..in evaluate flush");

      hand.bestFiveCardCombination = this.isFlush(hand);
    }
    if(!hand.hasRank)
    {
      console.log("not flush...in evaluate straight");

      hand.bestFiveCardCombination = this.isStraight(hand);
    }
    if(!hand.hasRank)
    {
      console.log("not straight ...in evaluate trips");

      hand.bestFiveCardCombination = this.isThreeOfAKind(hand)
    }
    if(!hand.hasRank)
    {
      console.log("not trips...in evaluate 2pair");

      hand.bestFiveCardCombination = this.isTwoPair(hand)
    }
    if(!hand.hasRank)
    {
      console.log("not 2pair..in evaluate pair");

      hand.bestFiveCardCombination = this.isPair(hand)
    }
    if(!hand.hasRank)//does it go in here even if it is not a high card
    {
      console.log("not pair..in evaluate high card");

      hand.ranks.high_card = true
      hand.rankHeirarchy[rankHeirarchyIndex.high_card]=true;
      hand.rank = "High Card";
      hand.hasRank = true;
      //console.log("hand is " + hand.rank)

      hand.bestFiveCardCombination = this.getHighestCards(5,hand);//wants 5 highest card from 7 valued array of string
      
    }
    this.printDeck(hand.bestFiveCardCombination);
    return 0;
  }

  
  isFourOfAKind(hand:HandComponent):string[]
  {
    if(hand.numbers.includes(4))
    {
      hand.ranks.quads = true;
      hand.rank = "Four of A Kind";
      hand.hasRank = true;
      hand.rankHeirarchy[rankHeirarchyIndex.quads]= true;
      var quadNumberIndex = hand.numbers.indexOf(4);
      //translate that number to letter in case it is a king queen etc
      var targetQuadCard = this.values[quadNumberIndex];
      var winningHand:string[] = [];
      var cardsLeft = hand.sevenCards;
      for(var i = hand.sevenCards.length - 1; i >= 0; i--)
      {
        if(hand.sevenCards[i].includes(targetQuadCard))
        {
          winningHand.push(hand.sevenCards[i]);//cant just add to new...need to remove from old
          cardsLeft.splice(i,1);
        }
      }
      hand.cardsLeft = cardsLeft;      
      hand.numbers[quadNumberIndex] = 0;//choose high card from remaining choices
      var highestKicker = this.getHighestCards(1,hand);
      hand.pokerHandIndependent = winningHand;


      return winningHand.concat(highestKicker);//returns 4 quad cards
    }
    console.log(hand.numbers)
    console.log(hand.rank)
    console.log(hand.ranks.quads);
    return [];
  }
  isFullHouse(hand:HandComponent):string[]
  {
    if(hand.numbers.includes(3) && hand.numbers.includes(2))
    {
      hand.ranks.full_house = true;
      hand.rank = "Full House";
      hand.rankHeirarchy[rankHeirarchyIndex.full_house]=true;
      hand.hasRank = true;

      //there can be multiple 3 of a kinds
      //there can be multipel2 of a kinds
      //make edgeCase

      var pairNumberIndex = hand.numbers.indexOf(2);
      var tripsNumberIndex = hand.numbers.indexOf(3);
      var targetTripsCard = this.values[tripsNumberIndex];
      var targetPairCard = this.values[pairNumberIndex];
      var winningHand:string[] = [];
      var cardsLeft = hand.sevenCards;
      for(var i = hand.sevenCards.length - 1; i >= 0; i--)
      {
        if(hand.sevenCards[i].includes(targetTripsCard))
        {
          winningHand.push(hand.sevenCards[i]);//cant just add to new...need to remove from old
          cardsLeft.splice(i,1);
        }
        else if(hand.sevenCards[i].includes(targetPairCard))
        {
          winningHand.push(hand.sevenCards[i]);//cant just add to new...need to remove from old
          cardsLeft.splice(i,1);
        }
      }
      hand.cardsLeft = cardsLeft;      
      hand.numbers[tripsNumberIndex] = 0;//choose high card from remaining choices

      hand.pokerHandIndependent = winningHand;

      return winningHand;
    }

    return [];
  }

  /*
  if there is a flush it is impossinle to have more than 1 kind of flush
  find the target suit after it has been confirmed as a flush
  put in ordered array for easier comparison of hand.indpendent poker hand
  */
  isFlush(hand:HandComponent):string[]
  {
    if(hand.suits.includes(5) || hand.suits.includes(6) || hand.suits.includes(7))
    {
      var targetSuit = hand.suits.indexOf(5);
      if(!targetSuit)
      {
        targetSuit = hand.suits.indexOf(6);
      }
      if(!targetSuit)
      {
        targetSuit = hand.suits.indexOf(7);
      }

      var targetSuitChar= '';
      switch (targetSuit) {
        case 0:
          targetSuitChar = 'D';
        break;
        case 1:
          targetSuitChar = 'C';
        break;
        case 2:
          targetSuitChar = 'H';
        break;
        case 3:
          targetSuitChar = 'S';
        break;
      
        default:
          break;
      }
      hand.ranks.flush = true;
      hand.rank = "Flush";
      hand.rankHeirarchy[rankHeirarchyIndex.flush]=true;
      console.log("hand is " + hand.rank)
      hand.hasRank = true;

      var winningHand: string[] = [];
      for(var i = 0; i < hand.sevenCards.length;i++)
      {
        if(hand.sevenCards[i].charAt(1)==targetSuitChar)
        {
          winningHand.push(hand.sevenCards[i]);
        }
      }
//       const words = ['Tango', 'Zulu', 'Bravo', 'Lima'];
// words.sort((a, b) => {
//   if (b > a) return 1;
//   if (b < a) return -1;
//   return 0;
// }); 

      winningHand.sort((a,b) => {
        if(winningHand.lastIndexOf(a) > winningHand.lastIndexOf(b))
        {
          return 1;
        }
        else
        {
          return -1;
        }
      });
      this.printDeck(winningHand);
      hand.pokerHandIndependent = winningHand;
      //ensure that pokerHandIndependent is ranked in order from least to greatest


      return [];
    }
    return [];
  }
  isStraight(hand:HandComponent):string[]
  {
    var consec = 0;
    for(var i = 0; i < hand.numbers.length; i++)
    {
      if(hand.numbers[i] > 0)
      {
        consec++;
        if(consec == 5)
        {
          hand.ranks.straight = true;
          hand.rank = "Straight";
          hand.rankHeirarchy[rankHeirarchyIndex.straight]=true;
          console.log("hand is " + hand.rank)
          hand.hasRank = true;

          //TODO: why is this commented out?
          //hand.pokerHandIndependent = winningHand;

          return [];//will need to adjust for edge case of 6 card straight
        }
      }
      else
      {
        consec = 0;
      }
    }  
      return [];
  }
  isThreeOfAKind(hand:HandComponent):string[]
  {
    if(hand.numbers.includes(3) && !hand.numbers.includes(2))
    {
      //return the highest card
      hand.ranks.trips = true;
      hand.rankHeirarchy[rankHeirarchyIndex.trips]=true;
      hand.rank = "Three of a Kind";
      console.log("hand is " + hand.rank)
      hand.hasRank = true;

      var tripsNumberIndex = hand.numbers.indexOf(3);
      //translate that number to letter in case it is a king queen etc
      var targetTripsCard = this.values[tripsNumberIndex];
      var winningHand:string[] = [];
      var cardsLeft = hand.sevenCards;
      for(var i = hand.sevenCards.length - 1; i >= 0; i--)
      {
        if(hand.sevenCards[i].includes(targetTripsCard))
        {
          winningHand.push(hand.sevenCards[i]);//cant just add to new...need to remove from old
          cardsLeft.splice(i,1);
        }
      }
      hand.cardsLeft = cardsLeft;      
      hand.numbers[tripsNumberIndex] = 0;//choose high card from remaining 3 cards
      var highestKicker = this.getHighestCards(2,hand);
      hand.pokerHandIndependent = winningHand;

      return winningHand.concat(highestKicker);//returns 3 trips cards and 2 highest kickers

    }
    return [];
  }
  isTwoPair(hand:HandComponent):string[]
  {
    var count = 0;
    var firstPairIndex = hand.numbers.lastIndexOf(2);
    console.log("this first pair is " + this.values[firstPairIndex] + " with an index of " + firstPairIndex );
    var pairIndices: number[] = [];
    if(firstPairIndex == -1)
    {
      return [];
    }
    var secondPairIndex = -1;
    pairIndices.push(firstPairIndex);
    //if there is only a pair of 2s firstPairIndex - 1 = 0
    //it will never enter for loop...skips to isPair

    for(var i = (firstPairIndex - 1); i > 0; i--)//not a two pair if there is a pair of aces...dont go down to 0 index
    {
      if(hand.numbers[i] == 2)
      {
        //or i could get last index of  first 2 and start counting back from there instead of numbers
        secondPairIndex = i;
        console.log("this second pair is " + this.values[i] + " with an index of " + secondPairIndex );
        pairIndices.push(i);
        count++;
        break;
      }
    }
    if(count > 0)
    {
      //pick best 2 pair if there are 3
      //by new logic quits after first highest 2 pair combos
      //add the indices to the hand.indpendent
     

      var targetPairCard = this.values[firstPairIndex];
      var targetSecondPairCard = this.values[secondPairIndex];
      var winningHand:string[] = [];
      var cardsLeft = hand.sevenCards;
      for(var i = hand.sevenCards.length - 1; i >= 0; i--)
      {
        if(hand.sevenCards[i].includes(targetPairCard) || hand.sevenCards.includes(targetSecondPairCard))
        {
          console.log("found a pair: " + hand.sevenCards[i]);
          winningHand.push(hand.sevenCards[i]);//cant just add to new...need to remove from old
          cardsLeft.splice(i,1);
        }
      }

      //winning cards should now be 4 cards long
      hand.cardsLeft = cardsLeft;      
      hand.numbers[firstPairIndex] = 0;//choose high card from remaining 3 cards
      hand.numbers[secondPairIndex] = 0;//choose high card from remaining 3 cards
      var highestKicker = this.getHighestCards(1,hand);
      hand.pokerHandIndependent = winningHand;
      console.log("Two pair from highest to lowest ");
      this.printDeck(hand.pokerHandIndependent);
      //very important the order of this is highest pair towards the beginning of the array
      //other wise 6s and 7s would beat Kings and 2s 

      hand.ranks.two_pairs = true;
      hand.rankHeirarchy[rankHeirarchyIndex.two_pairs]=true;
      hand.rank = "Two Pair";
      console.log("hand is " + hand.rank)
      hand.hasRank = true;
      return winningHand.concat(highestKicker);

      //hand.pokerHandIndependent = winningHand;
    }
    return [];
  }
  isPair(hand:HandComponent):string[]
  {
    if(hand.numbers.includes(2))
    {
      //return the highest card
      hand.ranks.pair = true;
      hand.rankHeirarchy[rankHeirarchyIndex.pair]=true;
      hand.rank = "Pair";
      console.log("hand is " + hand.rank);
      hand.hasRank = true;

      var pairNumberIndex = hand.numbers.indexOf(2);
      //translate that number to letter in case it is a king queen etc
      var targetPairCard = this.values[pairNumberIndex];
      var winningHand:string[] = [];
      var cardsLeft = hand.sevenCards;
      for(var i = hand.sevenCards.length - 1; i >= 0; i--)
      {
        if(hand.sevenCards[i].includes(targetPairCard))
        {
          winningHand.push(hand.sevenCards[i]);//cant just add to new...need to remove from old
          cardsLeft.splice(i,1);
        }
      }
      hand.cardsLeft = cardsLeft;      
      hand.numbers[pairNumberIndex] = 0;//choose high card from remaining 5 cards
      var highestKicker = this.getHighestCards(3,hand);
      hand.pokerHandIndependent = winningHand;
      return winningHand.concat(highestKicker);//returns 3 trips cards and 2 highest kickers
    }
    return [];
  }

  /*
  needs to adjust hand.numbers to remove any cards prior to method call
  Takes in a number of cards And hand component
  use hand.numbers to find highestCard....make sure to adjust numbers so that winning hand is no longer a part
  */
  getHighestCards(numberOfCards: number, hand:HandComponent):string[]
  {
    var highestCards: string[] = [];
    var sortedKickerOnly: number[] = [];
    
    for(var i = hand.numbers.length - 1; i >=0; i--)
    {
      if(hand.numbers[i] > 0)
      {
        sortedKickerOnly.push(i);
        //push the index of Value to an index array

        //now find suit of that highestCard in cardsLeft
        for(var j = 0; j < hand.cardsLeft.length; j++)
        {
          if(hand.cardsLeft.includes(this.values[i]))
          {
            highestCards.push(hand.cardsLeft[j]);
            break;//dont look for the same card once found...shouldnt be any pairs in cardsLeft
          }
        }
        if(highestCards.length == numberOfCards)
        {
          break;//dont continue to look once numberOfKicker cards have been found
        }
      }
    }

    hand.sortedKickerOnly = sortedKickerOnly;
    return highestCards;
  }

  isStraightFlush(hand:HandComponent):boolean
  {
    // var consec = 0;
    // if(!this.isFlush(suits, numbers))
    // {
    //   return false;
    // }

    // var suitOfStraightFlush = suits.indexOf(5);
    // if(suitOfStraightFlush == -1)
    // {
    //   suitOfStraightFlush = suits.indexOf(6)
    // }
    // if(suitOfStraightFlush == -1)
    // {
    //   suitOfStraightFlush = suits.indexOf(7);
    // }


    // //hands.sort
    // for(var j = 0; j < hands.length; j++)
    // {
    //   //sort by number
    //   //check the charAt(0) value and see what it maps to...A=1, A=14
      
    //   if(hands[j].charAt(0))
    //   {

    //   }
    // }



    return false;
  }

  testDeckLengthMethod()
  {
    console.log('deck length is' + this.deck.length)
  }

  getPlayerChips(player: number): number
  {

    switch (player) {
      case 1:
        return this.player1Chips;
        break; 
      case 2:
        return this.player2Chips;
        break;
      case 3:
        
          break;

      default:
        return 0;
        break;
    }
    return 0;
  }

  printDeck(deckToPrint: string [])
  {
    for(var i = 0; i < deckToPrint.length; i++)
    {
      console.log(deckToPrint[i]);
    }
  }

  loadCardImages(holeCards: string[], player:number): void {
    console.log("inside load card images");
    console.log(holeCards[0]);
    console.log(holeCards[1]);
    for(var i = 0; i < holeCards.length; i++)
    {
      var pictureString = "";
      if(holeCards[i].charAt(0) == '2')
      {
        pictureString += "2";
      }
      else if(holeCards[i].charAt(0) == '3')
      {
        pictureString += "3";
      }
      else if(holeCards[i].charAt(0) == '4')
      {
        pictureString += "4";
      }
      else if(holeCards[i].charAt(0) == '5')
      {
        pictureString += "5";
      }
      else if(holeCards[i].charAt(0) == '6')
      {
        pictureString += "6";
      }
      else if(holeCards[i].charAt(0) == '7')
      {
        pictureString += "7";
      }
      else if(holeCards[i].charAt(0) == '8')
      {
        pictureString += "8";
      }
      else if(holeCards[i].charAt(0) == '9')
      {
        pictureString += "9";
      }
      else if(holeCards[i].charAt(0) == 'T')
      {
        pictureString += "10";
      }
      else if(holeCards[i].charAt(0) == 'J')
      {
        pictureString += "jack";
      }
      else if(holeCards[i].charAt(0) == 'Q')
      {
        pictureString += "queen";
      }
      else if(holeCards[i].charAt(0) == 'K')
      {
        pictureString += "king";
      }
      else if(holeCards[i].charAt(0) == 'A')
      {
        pictureString += "ace";
      }

      if(holeCards[i].charAt(1) == 'D')
      {
        pictureString += "_of_diamonds.png";
      }
      else if(holeCards[i].charAt(1) == 'C')
      {
        pictureString += "_of_clubs.png";
      }
      else if(holeCards[i].charAt(1) == 'H')
      {
        pictureString += "_of_hearts.png";
      }
      else if(holeCards[i].charAt(1) == 'S')
      {
        pictureString += "_of_spades.png";
      }

      switch (player) {
        case 0://it is the shared board...flop...turn...river
            this.boardCards.push("../assets/cardImages/" + pictureString);
          break; 
        case 1:
          if(i == 0)
          {
            this.player1Card = "../assets/cardImages/" + pictureString;
          }
          else
          {
            this.player1Card2 = "../assets/cardImages/" + pictureString;
          } 
          break; 
        case 2:
          if(i == 0)
          {
            this.player2Card = "../assets/cardImages/" + pictureString;
          }
          else
          {
            this.player2Card2 = "../assets/cardImages/" + pictureString;
          } 
          break;
        }
    }
  }

  playSound()
  {
    let audio = new Audio();
    audio.src = "../assets/sound-onclick/click.mp3";
    audio.load();
    audio.play();
  }
  playCardDealSound()
  {
    let audio = new Audio();
    audio.src = "../assets/sound-onclick/single-card-dealt-from-hand.mp3";
    audio.load();
    audio.play();
  }

  foldHand()
  {
    // let audio = new Audio();
    // audio.src = "../assets/sound-onclick/foldSound.mp3";
    // audio.load();
    // audio.play();
    //set whatever players turn it was in the betting round;s hand to notLive
    //check if 1 hand is still live
  }
  playPlaceBetSound()
  {
    // let audio = new Audio();
    // audio.src = "../assets/sound-onclick/poker-chips-place-bet.mp3";
    // audio.load();
    // audio.play();
  }
  playWinPotSound()
  {
    // let audio = new Audio();
    // audio.src = "../assets/sound-onclick/poker-chips-pile-movement.mp3";
    // audio.load();
    // audio.play();
  }

}
