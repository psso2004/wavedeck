import fs from "fs/promises";
import createHttpError from "http-errors";
import { inject, injectable } from "inversify";
import { CreationAttributes, FindOptions, Transaction } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { IOC_TYPE } from "../../types/ioc.type";
import AudioFile from "./models/audio-file.model";

@injectable()
export class AudioFileService {
    constructor(
        @inject(IOC_TYPE.Sequelize) private readonly sequelize: Sequelize
    ) {}

    public createAudioFile(
        createData: Partial<CreationAttributes<AudioFile>>,
        transaction: Transaction | null = null
    ): Promise<AudioFile> {
        const repo = this.sequelize.getRepository(AudioFile);
        const audioFile = repo.build(
            createData as CreationAttributes<AudioFile>
        );
        return audioFile.save({ transaction });
    }

    public getAudioFile(
        options: FindOptions<AudioFile>
    ): Promise<AudioFile | null> {
        const repo = this.sequelize.getRepository(AudioFile);
        return repo.findOne(options);
    }

    public async deleteAudioFile(
        data: Pick<AudioFile, "id" | "userId">,
        transaction: Transaction | null = null
    ): Promise<void> {
        const { id, userId } = data;
        const repo = this.sequelize.getRepository(AudioFile);

        const audioFile = await repo.findByPk(id, {
            transaction,
        });
        if (audioFile === null) {
            throw new createHttpError.NotFound("not found audiofile");
        }
        if (audioFile.userId !== userId) {
            throw new createHttpError.Unauthorized("belongs to another user");
        }

        const useTrasaction =
            transaction ?? (await this.sequelize.transaction());

        let isTransactionOwner = false;
        if (!transaction) {
            isTransactionOwner = true;
        }

        try {
            await repo.destroy({ where: { id }, transaction: useTrasaction });

            await fs.unlink(audioFile.filePath);

            if (isTransactionOwner) {
                await useTrasaction.commit();
            }
        } catch (err) {
            if (isTransactionOwner) {
                await useTrasaction.rollback();
            }

            throw createHttpError.InternalServerError("failed to delete file");
        }
    }
}
