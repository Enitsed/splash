import axios from 'axios';

const getBoardListData = (categorySeq, offset) => {
  const boardQuery = `query
    listOfBoard($category_seq: ID!, $offset: Int!) {
      listOfBoard(category_seq: $category_seq, offset: $offset) {
        board_seq
        board_title
        board_content
      }
    }`;

  return axios
    .post('/graphql', {
      query: boardQuery,
      variables: { category_seq: categorySeq, offset },
    })
    .then((response) => {
      const { data, errors } = response.data;

      if ((errors && errors.shift()) || !data.listOfBoard) {
        // 데이터 없을 경우 빈 배열
        return [];
      }

      return data.listOfBoard;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export default { getBoardListData };
