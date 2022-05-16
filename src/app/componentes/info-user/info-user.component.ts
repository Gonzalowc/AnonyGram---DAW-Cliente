import { Component, Input, OnInit } from '@angular/core';
import { ChatModel } from 'src/app/shared/models/chatModel';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {
  @Input() user!: ChatModel;

  constructor() { }

  ngOnInit(): void {
  }

}
