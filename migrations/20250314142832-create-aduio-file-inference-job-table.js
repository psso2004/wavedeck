"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("audio_file_inference_jobs", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            audio_file_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "audio_files",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            inference_job_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "inference_jobs",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        });

        await queryInterface.addIndex("audio_file_inference_jobs", [
            "audio_file_id",
        ]);
        await queryInterface.addIndex("audio_file_inference_jobs", [
            "inference_job_id",
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("audio_file_inference_jobs");
    },
};
