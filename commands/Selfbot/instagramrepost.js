// thank you vMohammad::https://github.com/vMohammad24/VOT/blob/main/src/commands/social/instagram_repost.ts
const axios = require("axios");
const fs = require("fs");
const UserAgent = require("user-agents");
const userAgent = new UserAgent().toString();

const requireStartWith = "https://www.instagram.com/reels/";

module.exports = {
    name: "igr",
    description: "Repost an Instagram reel",
    async execute(message, args) {
        let url = args[0];
        if (!url.includes("://www.")) {
            url = url.replace("://", "://www.");
        }
        if (url.includes("/reel/")) {
            url = url.replace("/reel/", "/reels/");
        }

        if (!url.startsWith(requireStartWith)) {
            return message.edit("This is not a valid Instagram reel URL.");
        }

        let res;
        try {
            res = await axios.get(url, {
                headers: {
                    "User-Agent": userAgent,
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/jxl,image/avif,image/webp,image/apng,*/*;q=0.8",
                    "accept-language": "en-US,en;q=0.9",
                    "cache-control": "max-age=0",
                    "dnt": "1",
                    "sec-ch-prefers-color-scheme": "dark",
                    "sec-ch-ua": '"Not;A=Brand";v="24", "Chromium";v="128"',
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": '"Windows"',
                    "sec-fetch-dest": "document",
                    "sec-fetch-mode": "navigate",
                    "sec-fetch-site": "none",
                    "sec-fetch-user": "?1",
                    "upgrade-insecure-requests": "1",
                    "viewport-width": "1920",
                },
            });
        } catch (err) {
            return message.edit(`Request failed: ${err.message}`);
        }

        const body = res.data;
        const lookFor = '{"require":[["ScheduledServerJS","handle",null,[{"__bbox":{"require":';
        const index = body.indexOf(lookFor);
        if (index === -1) return message.edit("Failed to repost this reel.");

        const endIndex = body.indexOf("</script>", index);
        const text = body.slice(index, endIndex);

        let json;
        try {
            json = JSON.parse(text);
        } catch (e) {
            return message.edit("Failed to parse Instagram data.");
        }

        const edges = json?.require?.[0]?.[3]?.[0]?.__bbox?.require?.[0]?.[3]?.[1]?.__bbox?.result?.data?.xdt_api__v1__clips__clips_on_logged_out_connection_v2?.edges;
        if (!edges || !edges.length) return message.edit("No video found.");

        const media = edges[0].node.media;
        const videoUrl = media.video_versions[0].url;
        const code = media.code;
        const caption = media.caption?.text || "No caption";

        let headRes;
        try {
            headRes = await axios.head(videoUrl);
        } catch (e) {
            return message.edit("Failed to retrieve video size.");
        }

        const contentLength = parseInt(headRes.headers["content-length"] || "0");
        const maxSize = 10 * 1024 * 1024;

        if (contentLength > maxSize) {
            await message.channel.send({ content: `${caption}\n[Link](${videoUrl})` });
            return message.delete();
        }

        let fileData;
        try {
            const fileRes = await axios.get(videoUrl, { responseType: "arraybuffer" });
            fileData = fileRes.data;
        } catch (e) {
            return message.edit("Failed to download video.");
        }

        const filename = `${code}.mp4`;
        fs.writeFileSync(filename, fileData);
        await message.channel.send({ files: [filename], content: caption });

        setTimeout(() => {
            message.delete();
            fs.unlinkSync(filename);
        }, 5000);
    }
};
