const fs = require('fs');
const path = require('path');
const os = require('os');

const folderPath = path.join(os.tmpdir(), 'roblox', 'http');

function replace(filesToDelete, fileToReplace, message) {
    try {
        const copyFilePath = path.join(folderPath, fileToReplace);
        if (fs.existsSync(copyFilePath)) {
            let resultMessage = '';
            filesToDelete.forEach(fileToDelete => {
                const deleteFilePath = path.join(folderPath, fileToDelete);
                if (fs.existsSync(deleteFilePath)) {
                    fs.unlinkSync(deleteFilePath);
                } else {
                    resultMessage += `${fileToDelete} not found.\n`;
                }

                const newFilePath = path.join(folderPath, fileToDelete);
                fs.copyFileSync(copyFilePath, newFilePath);
                resultMessage += `${fileToDelete} has been replaced with ${fileToReplace}.\n`;
            });

            const maxLength = 2000;
            if (resultMessage.length > maxLength) {
                for (let i = 0; i < resultMessage.length; i += maxLength) {
                    message.edit(resultMessage.substring(i, i + maxLength));
                }
            } else {
                message.edit(resultMessage.trim());
            }
        } else {
            message.edit(`${fileToReplace} not found.`);
        }
    } catch (e) {
        message.edit(`An error occurred: ${e.message}`);
    }
}

function handleOption(option, message) {
    switch (option) {
        case "1": // sleeves
            replace(['aa33dd87fc9db92e891361e069da1849'], "8e3c58f586f437a45967ce912de7309b", message);
            break;

        case "2": // gun smoke
            replace(['8194373fb18740071f5e885bab349252'], "38342d3214ad04067e03106bdff41914", message);
            break;

        case "3": // sights
            replace(['89dee12dd59fda0cc7311ab4ca1fbada', '5b8101973499da2f7759f378699f8395', '8ecce4618eacde7373a0cc4c55ca9a76'], "c3eed25613be282991f7f36185313e77", message);
            break;

        case "4": // Remove Rings around Scopes
            replace(['30c4d2bb30b6b8c9ac7cfeec5db25a85'], "5873cfba79134ecfec6658f559d8f320", message);
            break;

        case "5": // hitmarker
            replace(['097165b476243d2095ef0a256320b06a'], "7cdebc991be99683783721c89a811fca", message);
            break;

        case "6": // csgo stuff idk
            replace(['15a253161b79aa6a1ddfd7ef15555d11'], "1713bc4194adaab263c4d3c5cecbfdcc", message);
            replace(['26918e90f1abb5fd12864ebe20dd2b52'], "b93e44dbbd509a298bee1130ca63e48f", message);
            replace(['9a196673eb84993249490f0a070e806a'], "5f8edf19a6d0041db9586332f5d3a0f4", message);
            replace(['a11dfa0f7018aac7a54fecefecf2e97e'], "e49a6a37d153b0ce16d292ffa1199edc", message);
            replace(['77c7a21884176db2c59be639ff17aba7'], "2532a059d588e2d36d4d523ce2617a28", message);
            break;

        case "7": // headshot
            replace(['9fb736f110d1c1827b6769b65905c08b'], "3a58d9fdc9f8fc1782ca47cc3733a48a", message);
            break;

        case "8": // Change Loading Screen
            replace(['fb2c7ac2ec87c1655b2b4e164c06faff'], "2c29a51f4c60ca7cac29e3b91402eede", message);
            replace(['2a0f4d38d4dce0dfa2184ba1caa7f48b'], "3806a2ec36387e4fc3a928f056430424", message);
            replace(['3954943badfd379184d6e16b1632b13d'], "9aac94e091392ec5e0f64e641a5f4157", message);
            replace(['cb666bb0152d6e8addc703cc1dd604a4'], "4fcced5c28c518548c822eb8e0dbb0f9", message);
            replace(['3954943badfd379184d6e16b1632b13d'], "2c29a51f4c60ca7cac29e3b91402eede", message);
            replace(['41527f8762bc7d05d6542f92e14964a0'], "383fc9fc2a91f85f6eeb6ad51ea109a7", message);
            replace(['a17bfdba378adaff8676b97b7707af5d'], "9aac94e091392ec5e0f64e641a5f4157", message);
            replace(['f805e3b08c949c46a8f137e10c4d3fdd'], "9aac94e091392ec5e0f64e641a5f4157", message);
            break;

        case "9": //
            replace(['2b6e488127f1fa50721794ae6fae2fb1'], "9c639fe66b822b2779cbacd7aa1d2c1f", message);
            replace(['fc15c5ee1a2b9f0ebff93e71017c1606'], "5d0ae31a7be9433ceffa7afdb6b9585e", message);
            replace(['5af3553a05895d04852a39c40c1cca15'], "be64327d114f2b4f9e86b992ff09fc0a", message);
            break;

        case "10": // teeth!!!
            replace([
                '005ad836ba1455869edc73665b4fd121',
                '8ecce4618eacde7373a0cc4c55ca9a76',
                '195558206e070259b1778f7f2b060064',
                '6be54002c2e0969f9dea1c6e36df6b53',
                'ef5bb04af53e042ac97807e95b8831f0',
                'fc3c45da7f42e4ba69be74c5bd1e98fa',
                '13a252223187fd113ab5c7e0e483581c',
                'ec61d9b888ea9925f41c1caeaf070515',
                '22f91d51eb902743e4889212a18ac29f',
                '85995b281dd719adebb5c2881ed12621',
                '6c0485968f795cd56c82442b2162451d',
                'bf8e6ed8e8a6c9ad46bb47f0ca679787',
                '2746963edf2de64842627829aa3c4ab7',
                'a5c0da3d422b8ceaafc016afe5d81d61',
                'c144899626f648e8d3383095ac0649fe',
                'f35b8ae90acc2d16a58127a901b653f3',
                'a68859ad958413ebd5a6ff084084d3b6',
                'f6f9567cfbaf1159abd7b3bc915823e2'], 'c5f68564f445f9091371af77f238d700', message);
            break;

        default:
            message.edit("Invalid option.");
            break;
    }
}

module.exports = {
    name: 'ct',
    description: 'Replace files based on selected options',
    execute(message, args) {
        if (args.length === 0) {
            const options = `
Options:
1: Sleeves
2: Gun Smoke
3: Sights
4: Remove Rings around Scopes
5: Hitmarker
6: csgo stuff
7: Headshot
8: Loading Screens
9: Banner Main Menu
10: TEETH!!!!
            `;
            message.edit(options);
            return;
        }

        args.forEach(option => handleOption(option, message));
    },
};
