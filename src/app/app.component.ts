import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AIGenerationService } from './aigeneration.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isCollapsed = false;
  messages: { role: string; content: string }[] = [];
  userInput: string = '';

  constructor(private aiService: AIGenerationService) {}

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ role: 'user', content: this.userInput });
      this.aiService.generateContent(this.userInput).subscribe((response) => {
        this.messages.push({ role: 'assistant', content: response });
      });
      this.userInput = '';
    }
  }

  getPhoto(role: string): string {
    return 'assets/' + (role ==='user' ? 'xixi.jpg' : 'robot.jpg');
  }
}
