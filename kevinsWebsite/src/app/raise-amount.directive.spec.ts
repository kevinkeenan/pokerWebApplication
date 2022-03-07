import { RaiseAmountDirective } from './raise-amount.directive';
import { Directive, ElementRef, HostListener } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DeckComponent } from './deck/deck.component';


describe('RaiseAmountDirective', () => {
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
    const directive = new RaiseAmountDirective(ele,deck, ac);
    expect(directive).toBeTruthy();
  });
});
