import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { TabMenuComponent } from './tab-menu/tab-menu.component';
import { PartyComponent } from './tab-menu/party/party.component';
import { DungeonComponent } from './tab-menu/dungeon/dungeon.component';
import { TownComponent } from './tab-menu/town/town.component';
import { AdventurerInfoComponent } from './tab-menu/party/adventurer-info/adventurer-info.component';
import { AdventurerListComponent } from './tab-menu/party/adventurer-list/adventurer-list.component';
import { AbilityComponent } from './tab-menu/party/adventurer-info/ability/ability.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleBarComponent,
    TabMenuComponent,
    PartyComponent,
    DungeonComponent,
    TownComponent,
    AdventurerInfoComponent,
    AdventurerListComponent,
    AbilityComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    
    MatTabsModule,
    MatToolbarModule,
    MatDividerModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatListModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
