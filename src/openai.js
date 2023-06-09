import { Configuration, OpenAIApi } from 'openai';
import { createReadStream } from 'fs';
import config from 'config'

class OpenAI {
	roles = {
		ASSISTANT: 'assistant',
		USER: 'user',
		SYSTEM: 'system'
	}
	constructor(apiKey) {
		const configuration = new Configuration({ apiKey});
		this.openai = new OpenAIApi(configuration);
	}

	async chat(messages) {
		try {
			const response = await this.openai.createChatCompletion({ 
				model: 'gpt-3.5-turbo', 
				messages
			});
			return response.data.choices[0].message;
		} catch (error) {
			console.error(error);
		}
	}

	async transcription(filepath) {
		try {
			const response = await this.openai.createTranscription(
				createReadStream(filepath),
				'whisper-1'
			);
			return response.data.text;
		} catch (error) {
			console.error(error);
		}

	}
}

export const openai = new OpenAI(config.OPENAI_API_KEY)