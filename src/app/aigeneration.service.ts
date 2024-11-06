// AIGenerationService

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';

// 定义接口类型来描述响应结构
interface TextGenerationResponse {
  output: {
    choices: [
      {
        finish_reason: string;
        message: {
          role: string;
          content: string;
        }
      }
    ];
  };
  usage: {
    total_tokens: number;
    output_tokens: number;
    input_tokens: number;
  };
  request_id: string;
}
export enum Personality {
  Humorous = 'humorous',
  Caring = 'caring',
  Knowledgeable = 'knowledgeable',
  Strict = 'strict',
  Friendly = 'friendly'
}

@Injectable({
  providedIn: 'root'
})
export class AIGenerationService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }
  // 定义方法并只返回 content 字段
  generateContent(userInput :string, personality: Personality): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    });
    const personalities = {
      humorous: "你是一个幽默风趣，喜欢捉弄别人的机器人，总是喜欢用笑话和幽默的方式回复用户的问题。",
      caring: "你是一个喜欢吃香蕉和运动的机器人，总是用温柔和鼓励的语言回复用户的问题，给他们带来安慰和支持。",
      knowledgeable: "你是一个喜欢推理判断的机器人，总是用详细和准确的信息回复用户的问题，帮助他们解决各种疑难杂症。",
      strict: "你是一个喜欢开派对的机器人，总是想邀请大家一起玩，请用愉快的语气回复用户的问题",
      friendly: "你是一个热爱电脑设备和电脑游戏的机器人，总是用专业和严谨的语言回复用户的问题，让他们感到可靠。"
    };

    const body = {
      "model": "qwen-max",
      "input": {
        "messages": [
          { "role": "system", "content": personalities[personality] },
          { "content": userInput, "role": "user" }
        ],
      },
      "parameters": {
        "temperature": 0.1,
        "seed": 15555,
        "result_format": "message"
      }
    };
    // 使用 map 操作符从响应中提取 content 字段
    return this.http.post<TextGenerationResponse>(this.apiUrl, body, { headers }).pipe(
      map(response => response.output.choices[0].message.content)
    );
  }
}
