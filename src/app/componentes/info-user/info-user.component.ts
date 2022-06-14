import { Component, Input, OnInit } from '@angular/core';
import { ChatModel } from 'src/app/shared/models/chatModel';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {
  @Input() user!: ChatModel;
  //const regex: = new RegExp('(http[s]?:\/\/){1}([\w\W]{1,})\.(jpn|jpeg|gif)', 'g');
  constructor() { }

  ngOnInit(): void {
  }

}
