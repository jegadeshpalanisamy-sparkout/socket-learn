import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { response } from 'express';
import { MessageService } from './service/message.service';
import { SocketService } from './service/socket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Angular-sockets';

  form:FormGroup;
  messages: Array<{ user: string; message: string }> = [];


  constructor(private formBuilder:FormBuilder,private socketService:SocketService){
    this.form = this.formBuilder.group({
      message :''
    })
  }



  ngOnInit(): void {
        // Listen for incoming messages from the server

      this.socketService.listen('receiveMessage').subscribe((message: any) => {
        console.log(message);
      this.messages.push(message);
      
      });
  }

  onMessageSend(){
    console.log(this.form.getRawValue());
    const messageData = { user: 'You', message: this.form.get('message')?.value };
    // Send the message to the server
    this.socketService.emit('sendMessage', messageData);
    
    // Add the message to the local message array
    this.messages.push(messageData);
    
    // Reset the form
    this.form.reset();  
   



  }
}
