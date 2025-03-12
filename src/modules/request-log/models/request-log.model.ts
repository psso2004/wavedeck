import { Column, DataType, Index, Model, Table } from "sequelize-typescript";

@Table({
    tableName: "request_logs",
})
export default class RequestLog extends Model<RequestLog> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Index("IX_request_id")
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    requestId!: string;

    @Index("IX_user_id")
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    userId!: string | null;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    endpoint!: string;

    @Column({
        type: DataType.JSON,
        allowNull: true,
    })
    payload!: string | null;

    @Column({
        type: DataType.JSON,
        allowNull: true,
    })
    response!: string | null;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    statusCode!: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    message!: string | null;

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
}
