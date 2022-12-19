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

    // return await Axios.get(baseURL, {
    //   params: {
    //     key: '32131448-3a2109ffe1ebf52f926fc3134',
    //     q: `${query}`,
    //     page: page,
    //     per_page: 40,
    //     image_type: 'photo',
    //     orientation: 'horizontal',
    //     safesearch: 'true',
    //   },
    // });
  } catch (error) {
    console.log(error);
  }

  // .then(res => res.data)
  // .catch(err => err);
};

// console.log('t_______________t');
// const res = getImages({ query: 'cat', page: 1 });
// console.log(res);
