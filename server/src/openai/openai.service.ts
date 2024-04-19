import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAIApi from 'openai';
import { ChatCompletionCreateParamsNonStreaming } from 'openai/resources';

@Injectable()
export class OpenAiService {
  public openai: OpenAIApi;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAIApi({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }

  async chatGptRequest(options: ChatCompletionCreateParamsNonStreaming) {
    const completion = await this.openai.chat.completions.create(options);

    const [content] = completion.choices.map(
      (choice) => choice.message.content,
    );

    return content;
  }

  systemPrompt(messages: string[]): { role: 'system'; content: string }[] {
    return messages.map((message) => ({
      role: 'system',
      content: message,
    }));
  }
}
