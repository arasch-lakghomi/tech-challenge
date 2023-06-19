import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject  } from 'rxjs/webSocket';

const WS_URL = "ws://localhost:3000";

export interface ServerMessage {
  id?: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$: WebSocketSubject<ServerMessage> = webSocket(WS_URL);
  private _messages$ = new Subject<ServerMessage>(); 
  messages$ = this._messages$.asObservable();

  connect(): void { 
    this.socket$.subscribe({
      next: msg => { 
        console.log('message received: ' + msg);
        this._messages$.next(msg);
      },
      error: err => console.log('error: ' + err),
      complete: () => console.log('complete')
    });
  }

  sendMessage(message: any) {
    this.socket$.next(message);
  }

  close() {
    this.socket$.complete(); 
  }

}
