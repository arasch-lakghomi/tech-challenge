import { Component, OnDestroy } from '@angular/core';
import { ServerMessage, WebsocketService } from './shared/services/websocket.service';
import { generate } from "random-words";
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  requestMessages: string[] = [];
  responseMessages: ServerMessage[] = [];
 
  constructor(private ws: WebsocketService) {
    this.connectToServer();
    this.listenToServerEvents();
    this.generateRandomRequestMessages();
  }

  private listenToServerEvents() {
    this.ws.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe(msg => {
        this.responseMessages.push(msg);
      });
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

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.ws.close();
  }
}
