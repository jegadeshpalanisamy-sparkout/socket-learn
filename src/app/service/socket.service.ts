import { ApplicationRef, Injectable, inject } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;
  constructor() { 
      this.socket = io('http://localhost:3000', { autoConnect: false });
      inject(ApplicationRef).isStable.pipe(
      first((isStable) => isStable))
      .subscribe(() => { this.socket.connect() }); 
  
     }  



  emit(eventName:string, data:any){
    this.socket.emit(eventName,data);
  }


  // Listen for messages from the server
  listen(eventName: string): Observable<any> {
    console.log('listen',eventName)

    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }
}
