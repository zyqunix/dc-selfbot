const path = require('path');
const os = require('os');
const fs = require('fs');

module.exports = {
    name: 'findhash',
    description: 'finds the temp file from the given hash',
    execute(message, args) {
        let file_found = false;
        searchFiles(args, () => {
            if (!file_found) {
                message.edit('Nothing was found.');
            }
        });

        function searchFiles(searchStrings, callback) {
            const directory = path.join(os.tmpdir(), 'Roblox', 'http');
            const foundFiles = new Set();
            fs.readdir(directory, { withFileTypes: true }, (err, files) => {
                if (err) {
                    console.error(`Could not read directory: ${directory}`);
                    return callback();
                }
                let pending = files.length;
                if (!pending) return callback();
                files.forEach((file) => {
                    const filePath = path.join(directory, file.name);
                    if (file.isDirectory()) {
                        searchFiles(filePath, searchStrings, () => {
                            if (!--pending) callback();
                        });
                    } else {
                        fs.readFile(filePath, 'latin1', (err, data) => {
                            if (err) {
                                console.error(`Could not read file: ${filePath}`);
                                if (!--pending) callback();
                                return;
                            }
                            const lines = data.split('\n');
                            if (lines.length > 2) {
                                lines.forEach((line, index) => {
                                    for (let i = 0; i < searchStrings.length; i++) {
                                        if (line.includes(searchStrings[i])) {
                                            if (!foundFiles.has(filePath)) {
                                                message.edit(`${searchStrings[i]} was found in \`\`\`${file.name}\`\`\``);
                                                file_found = true;
                                                foundFiles.add(filePath);
                                            }
                                        }
                                    }
                                });
                            }
                            if (!--pending) callback();
                        });
                    }
                });
            });
        }
    },
};
