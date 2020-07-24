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
  margin-left: 20px
`;

class BoardListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
    };
  }

  componentDidMount() {
    this.setState({ listData: BoardService.getBoardListData() });
  }

  render() {
    const { tableName } = this.props;
    const { listData } = this.state;

    return (
      <BoardTableWrapper>
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
        <div className="board_list_control_box_wrapper">
          <div className="board_list_control_box">
            <SearchInputWrapper>
              <Input size="mini" placeholder="search" />
              <Button size="tiny" content="search" />
            </SearchInputWrapper>
            <WriteBtnWrapper>
              <Button size="tiny" content="write" />
            </WriteBtnWrapper>
          </div>
        </div>
      </BoardTableWrapper>
    );
  }
}

BoardListView.propTypes = {
  tableName: PropTypes.string.isRequired,
};


export default BoardListView;