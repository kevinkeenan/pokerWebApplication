import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { DeckComponent } from './deck/deck.component';

import { GetApiDataService } from './services/get-api-data.service';
import { StartGameDirective } from './start-game.directive';
import { RaiseAmountDirective } from './raise-amount.directive';
import { HandComponent } from './hand/hand.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    DeckComponent,
    StartGameDirective,
    RaiseAmountDirective,
    HandComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    GetApiDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
