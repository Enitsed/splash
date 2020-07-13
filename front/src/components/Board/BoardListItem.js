import React from 'react';

const BoardListItem = (data) => {
  // 제목 ellipsis 처리를 위한 변수
  const maxTitleLength = 30;

  return (
    <tr className="board_table_row" key={data.no}>
      <th scope="row">{data.no}</th>
      <td>
        {data.title.length > maxTitleLength
          ? `${data.title.substring(0, maxTitleLength)}...`
          : data.title}
      </td>
      <td>{data.writer}</td>
      <td>{data.date}</td>
      <td>{data.views}</td>
    </tr>
  );
};

export default BoardListItem;
