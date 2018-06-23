import { Component, OnInit, Input } from '@angular/core';
import { Adventurer } from '../../../model/creature/adventurer/adventurer.model';

@Component({
  selector: 'app-adventurer-info',
  templateUrl: './adventurer-info.component.html',
  styleUrls: ['./adventurer-info.component.css']
})
export class AdventurerInfoComponent implements OnInit {
  @Input() adventurer: Adventurer;

  edit:boolean;

  constructor() { }

  ngOnInit() {
    this.edit = false;
  }

  onEditClick() {
    this.edit = !this.edit;
  }

}
