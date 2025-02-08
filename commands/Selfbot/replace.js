const os = require("os")
const path = require("path")
const fs = require("fs")

module.exports = {
    name: 'replace',
    description: 'fleasion',
    async execute(message, args) {
        const temp_path = path.join(os.tmpdir(), 'Roblox', 'http')

        const files_to_delete = args.slice(0, -1);
        const file_to_replace = args[args.length - 1];
        
        let replacefilepath = path.join(temp_path, file_to_replace);
        
        if (fs.existsSync(replacefilepath)) {
            const content = fs.readFileSync(replacefilepath);
            //message.edit(`Delete: ${files_to_delete}\nReplace: ${file_to_replace}`);
            for(let i = 0; i < files_to_delete.length; i++) {
                try {
                    const tempfilepath = path.join(temp_path, files_to_delete[i]);
                    if (fs.existsSync(tempfilepath)) {
                        fs.unlinkSync(tempfilepath);
                    }
                    fs.writeFileSync(tempfilepath, content);
                    message.edit(`Replaced ${files_to_delete[i]} with ${file_to_replace}`);
                } catch (err) {
                    message.edit(`A error occured when replacing: ${err}`);
                }
            }
        } else {
            message.edit(`File ${file_to_replace} does not exist`);
        }
    },
};