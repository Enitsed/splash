import axios from 'axios';

const getCategoryData = () => {
  const categoryQuery = `query {   
      categories {
        category_seq,
        category_lvl,
        category_name,
      }
    }`;

  return axios
    .post('/graphql', {
      query: categoryQuery,
      variables: {},
    })
    .then((response) => {
      const { data } = response.data;

      if (!data.categories) {
        // 데이터 없을 경우 빈 배열
        return [];
      }

      return data.categories;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export default { getCategoryData };
