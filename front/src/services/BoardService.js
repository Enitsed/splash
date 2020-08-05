import axios from 'axios';

const getBoardListData = (
  { categorySeq, boardTitle },
  boardOffset,
  boardLimit,
) => {
  const boardQuery = `query
    listOfBoard($param: Board_Input_List!, $board_offset: Int!, $board_limit: Int!) {
      listOfBoard(param: $param, board_offset: $board_offset, board_limit: $board_limit) {
        board_seq
        board_title
        board_content
        createdAt
        user {
          user_seq
          user_id
          user_name
        }
      }
    }`;

  return axios
    .post('/graphql', {
      query: boardQuery,
      variables: {
        param: {
          category_seq: categorySeq,
          board_title: boardTitle,
        },
        board_offset: boardOffset,
        board_limit: boardLimit,
      },
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
