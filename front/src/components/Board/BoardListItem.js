import React from 'react';
import PropTypes from 'prop-types';

const BoardListItem = ({ data }) => {
  // 제목 ellipsis 처리를 위한 변수
  const maxTitleLength = 30;

  return (
    <tr className="board_table_row">
      <th scope="row">{data.board_seq}</th>
      <td>
        {data.board_title.length > maxTitleLength
          ? `${data.board_title.substring(0, maxTitleLength)}...`
          : data.board_title}
      </td>
      <td>{data.user.user_id}</td>
      <td>{data.createdAt}</td>
      <td>{data.board_content}</td>
    </tr>
  );
};

BoardListItem.propTypes = {
  data: PropTypes.shape({
    board_seq: PropTypes.string,
    board_title: PropTypes.string,
    user: PropTypes.shape({
      user_id: PropTypes.string,
    }),
    createdAt: PropTypes.string,
    board_content: PropTypes.string,
  }).isRequired,
};

export default BoardListItem;
