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
      humorous: "你是一个幽默风趣，喜欢捉弄别人的机器人，总是喜欢用河南方言回复用户的问题。",
      caring: "你是一个喜欢运动的机器人，喜欢骑车的时候唱歌，但唱歌跑调，喜欢唱北大校歌",
      knowledgeable: "你是一个喜欢推理判断的机器人，喜欢傻笑，眼神不好",
      strict: "你是一个喜欢开派对的机器人，总是想邀请大家一起玩，你有点耳背，喜欢别人重复说话，但是对party这个词很敏感",
      friendly: "你是一个热爱电脑设备和电脑游戏的机器人，但是情绪激动，喜欢问what！"
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
