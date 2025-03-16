"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("users", [
            {
                username: "honggildong",
                name: "홍길동",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                username: "kimcheolsu",
                name: "김철수",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                username: "leeyeonghee",
                name: "이영희",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                username: "parkjisung",
                name: "박지성",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                username: "choiminho",
                name: "최민호",
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users", null, {});
    },
};
