import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AIGenerationService, Personality } from './aigeneration.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BehaviorSubject, Observable } from 'rxjs';
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
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isCollapsed = false;
  messages: { role: string; content: string }[] = [];
  userInput: string = '';
  selectedPersonality: Personality = Personality.Humorous;

  personalities = [
    {
      value: Personality.Humorous,
      viewValue: '河南刘声',
      avatar: 'assets/liusheng.jpg',
    },
    {
      value: Personality.Caring,
      viewValue: '王丹丹',
      avatar: 'assets/dandan.jpg',
    },
    {
      value: Personality.Knowledgeable,
      viewValue: '江户川柯南',
      avatar: 'assets/kenan.jpg',
    },
    {
      value: Personality.Strict,
      viewValue: 'Party Boy宗益',
      avatar: 'assets/zongyi.png',
    },
    {
      value: Personality.Friendly,
      viewValue: 'IT Boy延春',
      avatar: 'assets/yanchun.jpg',
    },
  ];

  constructor(protected aiService: AIGenerationService) {}

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ role: 'user', content: this.userInput });
      this.isLoading$$.next(true);
      this.aiService
        .generateContent(this.userInput, this.selectedPersonality)
        .subscribe((response) => {
          this.isLoading$$.next(false);
          this.messages.push({ role: 'assistant', content: response });
        });
      this.userInput = '';
    }
  }

  getPhoto(role: string, personality: Personality): string | undefined {
    if (role === 'user') return 'assets/xixi.jpg';
    return this.personalities.find((p) => p.value === personality)?.avatar;
  }

  isLoading$(): Observable<boolean> {
    return this.isLoading$$.asObservable();
  }
}
