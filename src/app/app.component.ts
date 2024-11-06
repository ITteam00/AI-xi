import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AIGenerationService } from './aigeneration.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule,CommonModule, RouterOutlet,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  messages: { role: string, content: string }[] = [];
  userInput: string = '';

  constructor(private aiService: AIGenerationService) {}

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ role: 'user', content: this.userInput });
      this.aiService.generateContent(this.userInput).subscribe(response => {
        this.messages.push({ role: 'assistant', content: response });
      });
      this.userInput = '';
    }
  }
}
