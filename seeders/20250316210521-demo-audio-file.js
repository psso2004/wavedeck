"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("audio_files", [
            {
                user_id: 1,
                file_name: "Cafecito por la Manana - Cumbia Deli.mp3",
                file_path:
                    "uploads/1742158436323-208875186-Cafecito por la Manana - Cumbia Deli.mp3",
                file_size: 7962159,
                duration: 199000,
                preview_url:
                    "http://localhost:3000/uploads/1742158436323-208875186-Cafecito por la Manana - Cumbia Deli.mp3",
            },
            {
                user_id: 2,
                file_name: "Cafecito por la Manana - Cumbia Deli.mp3",
                file_path:
                    "uploads/1742158460682-776694101-Cafecito por la Manana - Cumbia Deli.mp3",
                file_size: 7962159,
                duration: 199000,
                preview_url:
                    "http://localhost:3000/uploads/1742158460682-776694101-Cafecito por la Manana - Cumbia Deli.mp3",
            },
            {
                user_id: 3,
                file_name: "Cafecito por la Manana - Cumbia Deli.mp3",
                file_path:
                    "uploads/1742158464248-395453881-Cafecito por la Manana - Cumbia Deli.mp3",
                file_size: 7962159,
                duration: 199000,
                preview_url:
                    "http://localhost:3000/uploads/1742158464248-395453881-Cafecito por la Manana - Cumbia Deli.mp3",
            },
            {
                user_id: 4,
                file_name: "Cafecito por la Manana - Cumbia Deli.mp3",
                file_path:
                    "uploads/1742158468365-430278278-Cafecito por la Manana - Cumbia Deli.mp3",
                file_size: 7962159,
                duration: 199000,
                preview_url:
                    "http://localhost:3000/uploads/1742158468365-430278278-Cafecito por la Manana - Cumbia Deli.mp3",
            },
            {
                user_id: 5,
                file_name: "Cafecito por la Manana - Cumbia Deli.mp3",
                file_path:
                    "uploads/1742158471514-181558388-Cafecito por la Manana - Cumbia Deli.mp3",
                file_size: 7962159,
                duration: 199000,
                preview_url:
                    "http://localhost:3000/uploads/1742158471514-181558388-Cafecito por la Manana - Cumbia Deli.mp3",
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("audio_files", null, {});
    },
};
