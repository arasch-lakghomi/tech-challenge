import { Component } from '@angular/core';
import { WebsocketService } from './shared/services/websocket.service';
import { generate } from "random-words";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  requestMessages: string[] = [];

  constructor(private ws: WebsocketService) {
    this.connectToServer();
    this.generateRandomRequestMessages();
  }

  private generateRandomRequestMessages() {
    this.requestMessages = generate(10);
  }

  private connectToServer() {
    this.ws.connect();
  }

  onSendRequests() {
    // send messages to ws
  }

}
