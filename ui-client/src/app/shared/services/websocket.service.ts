import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject  } from 'rxjs/webSocket';
import {  Message } from '../types/message.type';

const WS_URL = "ws://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$: WebSocketSubject<Message> = webSocket(WS_URL);
  private _messages$ = new Subject<Message>(); 
  messages$ = this._messages$.asObservable();

  connect() { 
    this.socket$.subscribe({
      next: msg => this._messages$.next(msg),
      error: err => console.log('error: ' + err),
      complete: () => console.log('complete')
    });
  }

  sendMessage(request: string) {
    this.socket$.next({
      event: 'sendRequest',
      payload: { request }
    });
  }

  getMessagesById(id: number) {
    this.socket$.next({
      event: 'GetById',
      payload: { id }
    });
  }

  close() {
    this.socket$.complete(); 
  }

}
