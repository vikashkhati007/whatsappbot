const axios = require('axios');

const API_KEYS = [
  '6eab60dbd1mshb3fc9aaa2e46d43p1858bajsncb1d0d099d75',
  'ffc6daf208mshe3660dbaef61e7ep186d6fjsne6061a2bb8b7',
  '57c66f8404msh656fd57fae1d5e7p1dc2adjsn7245d47c40ce',
  '7d95000f9fmshd62d4b0ff25be71p19e8bejsnf731f01a836f',
  '9dd6bb9950msh3aaa77e23fa9487p1faaabjsnfe2305ff51b6',
  '316e7c989cmsh53eeac92ef31a34p1616a1jsndcad4d4d6827',
  '251faa83f0msha99db1bb0381260p1ae956jsn786190dc2929'
];

let currentApiKeyIndex = 0;

const getNextApiKey = () => {
  currentApiKeyIndex = (currentApiKeyIndex + 1) % API_KEYS.length;
  return API_KEYS[currentApiKeyIndex];
};


const getNumberDetails = async (phoneNumber) => {
  let data;
  let apiKey;

  for (let i = 0; i < API_KEYS.length; i++) {
    apiKey = getNextApiKey();

    const options = {
      method: 'GET',
      url: 'https://truecaller4.p.rapidapi.com/api/v1/getDetails',
      params: {
        phone: phoneNumber,
        countryCode: 'IN'
      },
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'truecaller4.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      data = response.data.data[0];
      break; // Exit the loop on successful response
    } catch (error) {
    }
  }

  return data;
};

module.exports = {getNumberDetails}