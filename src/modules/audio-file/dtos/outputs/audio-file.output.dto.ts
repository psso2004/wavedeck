import AudioFile from "../../models/audio-file.model";

export class AudioFileOutputDto {
    audioFileId: number;
    previewUrl: string;
    createdAt: Date;

    constructor(audioFileId: number, previewUrl: string, createdAt: Date) {
        this.audioFileId = audioFileId;
        this.previewUrl = previewUrl;
        this.createdAt = createdAt;
    }

    static fromModel(source: AudioFile) {
        return new AudioFileOutputDto(
            source.id,
            source.previewUrl,
            source.createdAt
        );
    }
}
