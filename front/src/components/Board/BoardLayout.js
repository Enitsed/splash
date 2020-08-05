import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CategoryService from '../../services/CategoryService';
import BoardListView from './BoardListView';
import BoardWriteView from './BoardWriteView';
import BoardCategoryListView from './BoardCategoryListView';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryLvl: 1,
      categoryOffset: 0,
      categoryData: [],
    };
  }

  componentDidMount() {
    const { categoryLvl, categoryOffset } = this.state;

    CategoryService.getCategoryData(categoryLvl, categoryOffset)
      .then((data) => {
        if (Array.isArray(data)) {
          this.setState({ categoryData: data });
        }
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { categoryData } = this.state;

    return (
      <div className="board_container">
        <Route exact path="/board">
          <BoardCategoryListView categoryData={categoryData} />
        </Route>
        {categoryData.map((category) => (
          <Route
            key={category.category_seq}
            exact
            path={`/board/boardList/${category.category_name}`}
          >
            <BoardListView category={category} />
          </Route>
        ))}
        <Route exact path="/board/boardWrite/">
          <BoardWriteView />
        </Route>
      </div>
    );
  }
}
