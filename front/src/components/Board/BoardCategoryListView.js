import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BoardListItem from './BoardListItem';
import BoardService from '../../services/BoardService';

export default class BoardCategoryListView extends React.Component {
  render() {
    const { categoryData } = this.props;

    return (
      <div className="board_category_box">
        {categoryData.map((category) => (
          <table className="board_table" key={category.id}>
            <caption>
              <Link to={`/board/boardList/${category.name}`}>
                {category.name}
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
              {BoardService.getBoardListData().map((data) =>
                BoardListItem(data),
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
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};
