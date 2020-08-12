import axios from 'axios';

const getCategoryData = (categoryLvl, categoryOffset) => {
  const categoryQuery = `query 
    categories($category_lvl: Int!, $category_offset: Int!) {
      categories(category_lvl: $category_lvl,  category_offset: $category_offset) {
        category_seq
        category_lvl
        category_name
        listOfBoard {
          board_seq
          board_title
          board_content
          board_div_cd
          createdAt
          user {
            user_seq
            user_id
            user_name
          }
        }
      }
    }`;

  return axios
    .post('/graphql', {
      query: categoryQuery,
      variables: {
        category_lvl: categoryLvl,
        category_offset: categoryOffset,
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
