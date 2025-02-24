const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const unlinkAsync = promisify(fs.unlink);

module.exports = {
    name: 'spotify',
    description: 'Download a song from Spotify and send it as an attachment',
    async execute(message, args) {
        const songUrl = args[0];

        if (!songUrl) {
            return message.edit('Please provide a Spotify song URL.');
        }

        const outputFile = path.join(__dirname, 'downloaded_song.mp3');
        const command = `"C:\\Users\\Fabio\\AppData\\Local\\Programs\\Python\\Python312\\Scripts\\spotdl.exe" "${songUrl}" --output "${outputFile}"`;

        exec(command, async (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing spotdl: ${stderr || error.message}`);
                return message.edit('An error occurred while downloading the song.');
            }

            try {
                const audioBuffer = await fs.promises.readFile(outputFile);
                
                await message.edit({
                    files: [{
                        attachment: audioBuffer,
                        name: 'downloaded_song.mp3',
                    }],
                });

                await unlinkAsync(outputFile);
            } catch (err) {
                console.error(`Error reading or sending file: ${err.message}`);
                message.edit('An error occurred while sending the song.');
            }
        });
    },
};
