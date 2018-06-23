import { Component, OnInit } from '@angular/core';
import { Adventurer } from '../../model/creature/adventurer/adventurer.model';
import { Creature } from '../../model/creature/creature.model';
import { Footman } from '../../model/creature/adventurer/classes/footman.model';

@Component({
  selector: 'app-dungeon',
  templateUrl: './dungeon.component.html',
  styleUrls: ['./dungeon.component.css']
})
export class DungeonComponent implements OnInit {
  adv: Adventurer = new Footman("Test", 10, 10, 10, 10, 10, 10);
  enemy: Creature;

  constructor() { }

  ngOnInit() {
  }

}
