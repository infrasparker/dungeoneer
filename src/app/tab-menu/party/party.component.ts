import { Component, OnInit } from '@angular/core';
import { Adventurer } from '../../model/creature/adventurer/adventurer.model';
import { Footman } from '../../model/creature/adventurer/classes/footman.model';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {
  party: Adventurer[];
  selected: Adventurer;

  constructor() {
    this.party = [
      new Footman("Matt Mercer", 8, 10, 8, 12, 14, 12, 1),
      new Footman("Travis Willingham", 16, 10, 14, 12, 12, 14, 1)
    ]
  }

  ngOnInit() {
  }

  changeSelected(adv: Adventurer) {
    this.selected = adv;
  }

}
