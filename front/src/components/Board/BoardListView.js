import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Input, Button } from 'semantic-ui-react';
import BoardService from '../../services/BoardService';
import BoardListItem from './BoardListItem';

const BoardTableWrapper = styled.div`
  width: 100%;
`;

const SearchInputWrapper = styled.div`
  display: flex
  width: 226px
  justify-content: space-between
`;

const WriteBtnWrapper = styled.div`
  margin-left: 20px;
`;

class BoardListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      boardOffset: 0,
      boardLimit: 10,
      param: {
        categorySeq: props.category.category_seq,
        boardTitle: '',
      },
    };

    this.searchInputHandler = this.searchInputHandler.bind(this);
    this.searchBtnHandler = this.searchBtnHandler.bind(this);
  }

  componentDidMount() {
    const { param, boardOffset, boardLimit } = this.state;

    BoardService.getBoardListData(param, boardOffset, boardLimit)
      .then((data) => {
        this.setState({ listData: data });
      })
      .catch((err) => console.error(err));
  }

  searchInputHandler(e) {
    const { category } = this.props;

    this.setState({
      param: { categorySeq: category.category_seq, boardTitle: e.target.value },
    });
  }

  searchBtnHandler() {
    const { param, boardOffset, boardLimit } = this.state;

    BoardService.getBoardListData(param, boardOffset, boardLimit)
      .then((data) => {
        this.setState({ listData: data });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { category } = this.props;
    const { listData } = this.state;

    return (
      <BoardTableWrapper>
        <table className="board_table">
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
            {Array.isArray(listData)
              ? listData.map((data) => BoardListItem(data))
              : null}
          </tbody>
        </table>
        <div className="board_list_control_box_wrapper">
          <div className="board_list_control_box">
            <SearchInputWrapper>
              <Input
                size="mini"
                placeholder="search"
                onChange={this.searchInputHandler}
              />
              <Button
                size="tiny"
                content="search"
                onClick={this.searchBtnHandler}
              />
            </SearchInputWrapper>
            <WriteBtnWrapper>
              <Button size="tiny">
                <Link
                  to={`/board/boardWrite?category_seq=${category.category_seq}`}
                >
                  write
                </Link>
              </Button>
            </WriteBtnWrapper>
          </div>
        </div>
      </BoardTableWrapper>
    );
  }
}

BoardListView.propTypes = {
  category: PropTypes.shape({
    category_seq: PropTypes.string.isRequired,
    category_name: PropTypes.string.isRequired,
  }).isRequired,
};

export default BoardListView;
