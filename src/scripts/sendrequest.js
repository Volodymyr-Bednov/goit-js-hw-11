import Axios from 'axios';
export { getImages };

const getImages = async query => {
  const baseURL = 'https://pixabay.com/api/';
  return await Axios.get(baseURL, {
    params: {
      key: '32131448-3a2109ffe1ebf52f926fc3134',
      q: `${query}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    },
  })
    .then(res => res.data.hits)
    .catch(err => err);
};
