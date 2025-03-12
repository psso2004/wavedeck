import {
    Column,
    DataType,
    HasMany,
    Index,
    Model,
    Table,
} from "sequelize-typescript";
import AudioFile from "../../audio-file/models/audio-file.model";

@Table({
    tableName: "users",
})
export default class User extends Model<User> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Index("IX_username")
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    username!: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    name!: string;

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
    @HasMany(() => AudioFile)
    audioFiles!: AudioFile[];
}
