import { injectable } from "inversify";

@injectable()
export class AIConverterService {
    public convertAudioWithAI(
        filePath: string,
        voiceId: number,
        pitch: number,
        soundQuality: number
    ) {
        return {
            data: {
                originalPath: filePath,
                convertedPath: filePath,
                fileSize: 10000,
            },
        };
    }
}
