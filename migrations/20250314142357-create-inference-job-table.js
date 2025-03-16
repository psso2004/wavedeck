"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("inference_jobs", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            voice_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            pitch: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            sound_quality: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            original_path: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            converted_path: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            file_size: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            preview_url: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            queue_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
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

        await queryInterface.addIndex("inference_jobs", ["voice_id"], {
            name: "IX_voice_id",
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("inference_jobs");
    },
};
