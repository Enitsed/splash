import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BoardListItem from './BoardListItem';

export default class BoardCategoryListView extends React.Component {
  render() {
    const { categoryData } = this.props;

    return (
      <div className="board_category_box">
        {categoryData.map((category, i) => (
          <table className="board_table" key={category.category_seq}>
            <caption>
              <Link to={`/board/boardList/${category.category_name}`}>
                {category.category_name}
              </Link>
            </caption>
            <thead className="board_table_head">
              <tr className="board_table_row">
                <th scope="col" width="50px;">
                  No
                </th>
                <th scope="col" width="300px;">
                  Title
                </th>
                <th scope="col" width="80px;">
                  Writer
                </th>
                <th scope="col" width="100px;">
                  Date
                </th>
                <th scope="col" width="70px;">
                  Views
                </th>
              </tr>
            </thead>
            <tbody className="board_table_body">
              {category.listOfBoard.length > 0 ? (
                category.listOfBoard.map((board) => {
                  return <BoardListItem data={board} key={board.board_seq} />;
                })
              ) : (
                <tr className="board_table_row">
                  <th scope="row" colSpan="5">
                    글이 존재하지 않습니다.
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        ))}
      </div>
    );
  }
}

BoardCategoryListView.propTypes = {
  categoryData: PropTypes.arrayOf(
    PropTypes.shape({
      category_name: PropTypes.string.isRequired,
      category_seq: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
