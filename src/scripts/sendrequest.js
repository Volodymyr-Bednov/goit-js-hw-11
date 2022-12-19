import axios from 'axios';
export { getImages };

const getImages = async ({ query, page }) => {
  const baseURL = 'https://pixabay.com/api/';
  try {
    const data = await axios.get(baseURL, {
      params: {
        key: '32131448-3a2109ffe1ebf52f926fc3134',
        q: `${query}`,
        page: page,
        per_page: 40,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
