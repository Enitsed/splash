import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BoardListView from './BoardListView';
import BoardCategoryListView from './BoardCategoryListView';
import CategoryService from '../../services/CategoryService';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryData: [],
    };
  }

  componentDidMount() {
    this.setState({ categoryData: CategoryService.getCategoryData() });
  }

  render() {
    const { categoryData } = this.state;

    return (
      <div className="board_container">
        <Route
          exact
          path="/board"
          render={(props) => (
            <BoardCategoryListView {...props} categoryData={categoryData} />
          )}
        />
        {categoryData.map((category) => (
          <Route
            key={category.id}
            exact
            path={`/board/boardList/${category.name}`}
            render={(props) => (
              <BoardListView {...props} tableName={category.name} />
            )}
          />
        ))}
      </div>
    );
  }
}
