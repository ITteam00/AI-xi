import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AIGenerationService, Personality } from './aigeneration.service';
import { environment } from '../environments/environment';

fdescribe('AIGenerationService', () => {
  let service: AIGenerationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AIGenerationService]
    });
    service = TestBed.inject(AIGenerationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return generated content', () => {
    const mockResponse = {
      output: {
        choices: [
          {
            finish_reason: 'stop',
            message: {
              role: 'assistant',
              content: '这是生成的内容'
            }
          }
        ]
      },
      usage: {
        total_tokens: 10,
        output_tokens: 5,
        input_tokens: 5
      },
      request_id: 'test-request-id'
    };

    const userInput = '测试输入';
    const personality = Personality.Humorous;

    service.generateContent(userInput, personality).subscribe(content => {
      expect(content).toBe('这是生成的内容');
    });

    const req = httpMock.expectOne(environment.apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${environment.apiKey}`);
    req.flush(mockResponse);
  });
});
