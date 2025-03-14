"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("request_logs", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            request_id: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            endpoint: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            payload: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            response: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            status_code: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            message: {
                type: Sequelize.STRING,
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

        await queryInterface.addIndex("request_logs", ["request_id"], {
            name: "IX_request_id",
        });
        await queryInterface.addIndex("request_logs", ["user_id"], {
            name: "IX_user_id",
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("request_logs");
    },
};
