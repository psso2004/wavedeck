import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import InferenceJob from "../../inference-job/models/inference-job.model";
import AudioFile from "./audio-file.model";

@Table({
    tableName: "audio_file_inference_jobs",
})
export default class AudioFileInferenceJob extends Model<AudioFileInferenceJob> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @ForeignKey(() => AudioFile)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    audioFileId!: number;

    @ForeignKey(() => InferenceJob)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    inferenceJobId!: number;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    createdAt!: Date;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    updatedAt!: Date;

    /**
     * relationships
     */
    @BelongsTo(() => AudioFile)
    audioFile!: AudioFile;

    @BelongsTo(() => InferenceJob)
    inferenceJob!: InferenceJob;
}
