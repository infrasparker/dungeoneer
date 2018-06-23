import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Adventurer } from '../../../model/creature/adventurer/adventurer.model';

@Component({
  selector: 'app-adventurer-list',
  templateUrl: './adventurer-list.component.html',
  styleUrls: ['./adventurer-list.component.css']
})
export class AdventurerListComponent implements OnInit {
  @Input() party: Adventurer[];
  @Output() advSelected;

  constructor() {
    this.advSelected = new EventEmitter<Adventurer>()
  }

  ngOnInit() {
  }

  onClick(adv: Adventurer) {
    this.advSelected.emit(adv);
  }
}
