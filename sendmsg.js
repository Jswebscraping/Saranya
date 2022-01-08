const axios = require('axios');
const webhook =
  'https://discord.com/api/webhooks/880068649162002492/9cFsV9RTy5TrXFmRrRmuuG-W1l1TeX1M1CBButMQ-Ld4Kiq1RTDgbdfJTLeJtzRA-M0X';
var logError = async (source) => {
  await axios.post(webhook, { content: source });
};

module.exports = logError;
