import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject  } from 'rxjs/webSocket';

const WS_URL = "ws://localhost:3000";

export interface Message {
  source: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$: WebSocketSubject<any> = webSocket(WS_URL);

  connect() { 
    this.socket$.subscribe({
      next: msg => console.log('message received: ' + msg),
      error: err => console.log(err),
      complete: () => console.log('complete')
    });
  }
}
