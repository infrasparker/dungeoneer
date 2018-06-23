import { Component, OnInit, Input } from '@angular/core';
import { Ability } from '../../../../model/creature/ability.model';

@Component({
  selector: 'app-ability',
  templateUrl: './ability.component.html',
  styleUrls: ['./ability.component.css']
})
export class AbilityComponent implements OnInit {
  @Input() ability: Ability

  constructor() { }

  ngOnInit() {
  }

}
