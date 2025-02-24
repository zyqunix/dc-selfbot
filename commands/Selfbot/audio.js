const axios = require('axios');

module.exports = {
  name: 'audio',
  description: 'Download audio',
  execute(message, args) {
    if (!args[0]) {
      return message.edit('Please provide a URL.');
    }

    const url = args[0];
    const audioFormat ='mp3'; // Default to mp3
    const audioBitrate = '128'; // Default to 128
    const filenameStyle = 'basic'; // Change if needed
    const downloadMode = 'audio'; // For audio-only downloads
    const disableMetadata = false; // Disable file metadata
    const tiktokFullAudio = false; // For TikTok audio

    const requestBody = {
      url,
      audioFormat,
      audioBitrate,
      filenameStyle,
      downloadMode,
      disableMetadata,
      tiktokFullAudio,
    };

    console.log('Request Body:', requestBody);

    axios.post('https://api.cobalt.tools/', requestBody, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
     .then((response) => {
        const responseBody = response.data;

        if (responseBody.status ==='redirect' || responseBody.status === 'tunnel') {
          const fileUrl = responseBody.url;
          message.edit(`[Click to download audio](${fileUrl})`);
        } else if (responseBody.status === 'error') {
          console.error('API error:', responseBody.error);
          message.edit(`Error: ${responseBody.error.code}`);
        } else if (responseBody.status === 'picker') {
          const options = responseBody.picker.map(item => item.url).join('\n');
          message.edit(`Multiple audio options available:\n${options}`);
        } else {
          console.error('Unknown API response:', responseBody);
          message.edit(`Unknown response: ${responseBody.status}`);
        }
      })
     .catch((error) => {
        console.error('Request failed:', error);
        message.edit(`Error: ${error.message}`);
      });
  },
};
