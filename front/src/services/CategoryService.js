import axios from 'axios';

const getCategoryData = (categoryLvl) => {
  const categoryQuery = `query 
    categories($category_lvl: Int!) {
      categories(category_lvl: $category_lvl) {
        category_seq
        category_lvl
        category_name
        listOfBoard {
          board_seq
          board_title
          board_content
        }
      }
    }`;

  return axios
    .post('/graphql', {
      query: categoryQuery,
      variables: {
        category_lvl: categoryLvl,
      },
    })
    .then((response) => {
      const { data, errors } = response.data;

      if ((errors && errors.shift()) || !data.categories) {
        // 데이터 없을 경우 빈 배열
        console.error('no data availiable');
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
