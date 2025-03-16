"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("inference_jobs", [
            {
                id: 1,
                voice_id: 1,
                pitch: 0,
                sound_quality: 24,
                original_path:
                    "uploads/1742158436323-208875186-Cafecito por la Manana - Cumbia Deli.mp3",
                converted_path:
                    "uploads/1742158436323-208875186-Cafecito por la Manana - Cumbia Deli.mp3",
                file_size: 7962159,
                preview_url:
                    "http://localhost:3000/uploads/1742158436323-208875186-Cafecito por la Manana - Cumbia Deli.mp3",
                queue_id: 1,
            },
            {
                id: 2,
                voice_id: 2,
                pitch: 0,
                sound_quality: 24,
                original_path:
                    "uploads/1742158460682-776694101-Cafecito por la Manana - Cumbia Deli.mp3",
                converted_path:
                    "uploads/1742158460682-776694101-Cafecito por la Manana - Cumbia Deli.mp3",
                file_size: 7962159,
                preview_url:
                    "http://localhost:3000/uploads/1742158460682-776694101-Cafecito por la Manana - Cumbia Deli.mp3",
                queue_id: 2,
            },
            {
                id: 3,
                voice_id: 3,
                pitch: 0,
                sound_quality: 24,
                original_path:
                    "uploads/1742158464248-395453881-Cafecito por la Manana - Cumbia Deli.mp3",
                converted_path:
                    "uploads/1742158464248-395453881-Cafecito por la Manana - Cumbia Deli.mp3",
                file_size: 7962159,
                preview_url:
                    "http://localhost:3000/uploads/1742158464248-395453881-Cafecito por la Manana - Cumbia Deli.mp3",
                queue_id: 3,
            },
        ]);
        await queryInterface.bulkInsert("audio_file_inference_jobs", [
            {
                id: 1,
                audio_file_id: 1,
                inference_job_id: 1,
            },
            {
                id: 2,
                audio_file_id: 2,
                inference_job_id: 2,
            },
            {
                id: 3,
                audio_file_id: 3,
                inference_job_id: 3,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("audio_file_inference_jobs", null, {});
        await queryInterface.bulkDelete("inference_jobs", null, {});
    },
};
