import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getBoardListData } from '../../services/BoardService';
import BoardListItem from './BoardListItem';

export default class BoardListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
    };
  }

  componentDidMount() {
    this.setState({ listData: getBoardListData() });
  }

  render() {
    const { tableName } = this.props;
    const { listData } = this.state;

    return (
      <table className="board_table">
        <caption>
          <Link to={`/board/boardList/${tableName}`}>{tableName}</Link>
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
          {listData.map((data) => BoardListItem(data))}
        </tbody>
      </table>
    );
  }
}

BoardListView.propTypes = {
  tableName: PropTypes.string.isRequired,
};

BoardListView.defaultProp = {
  tableName: 'Default',
};
