import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from "sequelize-typescript";
import User from "../../user/models/user.model";
import AudioFileInferenceJob from "./audio-file-inference-job.model";

@Table({
    tableName: "audio_files",
})
export default class AudioFile extends Model<AudioFile> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    fileName!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    filePath!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    fileSize!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    duration!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    previewUrl!: string;

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
    @BelongsTo(() => User)
    user!: User;

    @HasMany(() => AudioFileInferenceJob)
    audioFileInferenceJobs!: AudioFileInferenceJob[];
}
