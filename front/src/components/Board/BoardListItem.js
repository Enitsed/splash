import React from 'react';

const BoardListItem = (data) => {
  // 제목 ellipsis 처리를 위한 변수
  const maxTitleLength = 30;

  return (
    <tr className="board_table_row" key={data.board_seq}>
      <th scope="row">{data.board_seq}</th>
      <td>
        {data.board_title.length > maxTitleLength
          ? `${data.board_title.substring(0, maxTitleLength)}...`
          : data.board_title}
      </td>
      <td>{data.board_content}</td>
      <td>{data.board_content}</td>
      <td>{data.board_content}</td>
    </tr>
  );
};

export default BoardListItem;
