import { StartGameDirective } from './start-game.directive';
import { Directive, ElementRef, HostListener } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DeckComponent } from './deck/deck.component';

describe('StartGameDirective', () => {
  let expected = '';
  let deck: DeckComponent;
  let ele: ElementRef;
  let ac: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      //declarations: [HomeComponent ]
    })
    .compileComponents();
  });

  it('should create an instance', () => {
    const directive = new StartGameDirective(ele, deck, ac);
    expect(directive).toBeTruthy();
  });
});
