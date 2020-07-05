import React from 'react';

const BoardListItem = (data) => {
  return (
    <tr className="board_table_row" key={data.no}>
      <th scope="row">{data.no}</th>
      <td>{data.title}</td>
      <td>{data.writer}</td>
      <td>{data.date}</td>
      <td>{data.views}</td>
    </tr>
  );
};

export default BoardListItem;
