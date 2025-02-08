const axios = require('axios');

module.exports = {
  name: 'video',
  description: 'Download video',
  execute(message, args) {
    if (!args[0]) {
      return message.edit('Please provide a URL.');
    }

    const url = args[0];
    const vCodec = 'h264';
    const vQuality = '720';
    const aFormat = 'mp3';
    const filenamePattern = 'basic';
	const isAudioOnly = false;
    const isTTFullAudio = false;
    const isAudioMuted = false;
    const dubLang = false;
    const disableMetadata = false; 
    const twitterGif = false;
    const tiktokH265 = false;

    const requestBody = {
      url,
      vCodec,
      vQuality,
      aFormat,
      filenamePattern,
      isAudioOnly,
      isTTFullAudio,
      isAudioMuted,
      dubLang,
      disableMetadata,
      twitterGif,
      tiktokH265,
    };

    axios.post('https://api.cobalt.tools/api/json', requestBody, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      const responseBody = response.data;

      if (responseBody.status === 'success' || responseBody.status === 'stream' || responseBody.status === 'redirect') {
        const fileUrl = responseBody.url;
        if (fileUrl) {
          message.edit(`[Click to download](${fileUrl})`);
        } else {
          message.edit(`No URL provided in response.`);
        }
      } else if (responseBody.status === 'error') {
        message.edit(`Error: ${responseBody.text}`);
      } else {
        message.edit(`Unknown response: ${responseBody.status}`);
      }
    })
    .catch((error) => {
      message.edit(`Error: ${error.message}`);
    });
  },
};
