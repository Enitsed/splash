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
    CategoryService.getCategoryData()
      .then((data) => {
        this.setState({ categoryData: data });
      })
      .catch((err) => console.error(err));
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
            key={category.category_seq}
            exact
            path={`/board/boardList/${category.category_name}`}
            render={(props) => (
              <BoardListView {...props} tableName={category.category_name} />
            )}
          />
        ))}
      </div>
    );
  }
}
