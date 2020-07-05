import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import BoardListView from './BoardListView';
import BoardListItem from './BoardListItem';
import { getCategoryData } from '../../services/CategoryService';
import { getBoardListData } from '../../services/BoardService';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryData: [],
    };
  }

  componentDidMount() {
    this.setState({ categoryData: getCategoryData() });
  }

  render() {
    const { categoryData } = this.state;

    return (
      <div className="board_container">
        {categoryData.map((category) => (
          <div key={category.id}>
            <Route
              exact
              path="/board"
              component={() => boardCategoryList(category)}
            />
            <Route
              exact
              path={`/board/boardList/${category.name}`}
              component={() => <BoardListView tableName={category.name} />}
            />
          </div>
        ))}
      </div>
    );
  }
}

const boardCategoryList = (category) => (
  <table className="board_table">
    <caption>
      <Link to={`/board/boardList/${category.name}`}>{category.name}</Link>
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
      {getBoardListData().map((data) => BoardListItem(data))}
    </tbody>
  </table>
);
