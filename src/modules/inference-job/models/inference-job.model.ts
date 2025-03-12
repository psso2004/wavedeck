import {
    Column,
    DataType,
    HasMany,
    Index,
    Model,
    Table,
} from "sequelize-typescript";
import AudioFileInferenceJob from "../../audio-file/models/audio-file-inference-job.model";

@Table({
    tableName: "inference_jobs",
})
export default class InferenceJob extends Model<InferenceJob> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Index("IX_voice_id")
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    voiceId!: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    })
    pitch!: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    })
    soundQuality!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    originalPath!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    convertedPath!: string | null;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    fileSize!: number | null;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    previewUrl!: string | null;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    queue_position!: number | null;

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
    @HasMany(() => AudioFileInferenceJob)
    audioFileInferenceJobs!: AudioFileInferenceJob[];
}
