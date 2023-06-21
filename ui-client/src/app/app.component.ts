import { Component, OnDestroy } from '@angular/core';
import { WebsocketService } from './shared/services/websocket.service';
import { generate } from "random-words";
import { Subject, takeUntil } from 'rxjs';
import { Message } from './shared/types/message.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  requestMessages: string[] = [];
  responses: {id: number, message: string}[] = [];
  mappings: string[] = [];
  sendButtonClicked: boolean = false;
  mapButtonClicked: boolean = false;
 
  constructor(private ws: WebsocketService) {
    this.connectToServer();
    this.listenToServerEvents();
    this.generateRandomRequestMessages();
  }

  private listenToServerEvents() {
    this.ws.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe(msg => this.handleServerMessage(msg));
  }
  
  private handleServerMessage(msg: Message) {
    if (msg.event === 'sendResponse') {
      this.responses.push({id: msg.payload.id!, message: msg.payload.response!});
    }
    if (msg.event === 'sendMap') {
      this.mappings.push(`${msg.payload.request!}  =>  ${msg.payload.response!}`);
    }
  }

  private generateRandomRequestMessages() {
    this.requestMessages = generate(10);
  }

  private connectToServer() {
    this.ws.connect();
  }

  onSendRequests() {
    this.requestMessages.forEach(message => {
      this.ws.sendMessage(message);
    });
  }

  onGetMapping() {
    this.responses.forEach(response => {
      this.ws.getMessagesById(response.id);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.ws.close();
  }
}
