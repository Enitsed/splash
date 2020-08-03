import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { Route } from 'react-router-dom';
import BoardListView from './BoardListView';
import BoardCategoryListView from './BoardCategoryListView';
import CategoryService from '../../services/CategoryService';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryLvl: 1,
      categoryData: [],
    };
  }

  componentDidMount() {
    const { categoryLvl } = this.state;

    CategoryService.getCategoryData(categoryLvl)
      .then((data) => {
        if (Array.isArray(data)) {
          this.setState({ categoryData: data });
        }
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { categoryData } = this.state;
    const { userData } = this.props;

    return (
      <div className="board_container">
        {userData.user_status === 'active' ? (
          <>
            <Route
              exact
              path="/board"
              render={(props) => (
                <BoardCategoryListView {...props} categoryData={categoryData} />
              )}
            />
            <ProtectedComponent categoryData={categoryData} />
          </>
        ) : (
          <p>로그인 전 입니다.</p>
        )}
      </div>
    );
  }
}

const ProtectedComponent = ({ categoryData }) =>
  categoryData.map((category) => (
    <Route
      key={category.category_seq}
      exact
      path={`/board/boardList/${category.category_name}`}
      render={(props) => <BoardListView {...props} category={category} />}
    />
  ));

const mapStateToProps = ({ UserReducer }) => ({
  userData: UserReducer.userData,
});

Board.defaultProps = {
  userData: null,
};

Board.propTypes = {
  userData: Proptypes.shape({
    user_name: Proptypes.string,
    user_status: Proptypes.string,
  }),
};

export default connect(mapStateToProps)(Board);
