import axios from "axios";
import ffmpeg from "fluent-ffmpeg";
import installer from "@ffmpeg-installer/ffmpeg";
import { createWriteStream } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

class OggConvector {
	constructor() {
		ffmpeg.setFfmpegPath(installer.path)
	}

	toMp3(input, output) {
		try {
			const outputPath = resolve(dirname(input), `${output}.mp3`);
			return new Promise((resolve, reject) => {
				ffmpeg(input)
				.inputOption('-t 30')
				.output(outputPath)
				.on('end', () => resolve(outputPath))
				.on('error', (error) => reject(error))
				.run()
			})
		} catch (error) {
			console.error(error)
		}
	}
	async create(url, filename) {
		const oogPath = resolve(__dirname, '../voices', `${filename}.ogg`)
		try {
			const response = await axios({
				method: 'get',
				url,
				responseType: 'stream',
			})
			return new Promise((resolve, reject) => {
				const stream = createWriteStream(oogPath);
				response.data.pipe(stream);
				stream.on('finish', () => resolve(oogPath))
			})
		} catch (error) {
			console.error(error)
		}	
	}
}

export const ogg = new OggConvector();