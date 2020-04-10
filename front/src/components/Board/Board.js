import React, { Component } from 'react';

export default class Board extends Component {
  render() {
    return (
      <div className="board_container">
        <table className="board_table">
          <caption>Freeboard</caption>
          <thead className="board_table_head">
            <tr className="board_table_row">
              <th scope="col" width="100px;">
                Number
              </th>
              <th scope="col" width="300px;">
                Title
              </th>
              <th scope="col" width="100px;">
                Writer
              </th>
              <th scope="col" width="150px;">
                Date
              </th>
              <th scope="col" width="100px;">
                Views
              </th>
            </tr>
          </thead>
          <tbody className="board_table_body">
            <tr className="board_table_row">
              <th scope="row">2</th>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
            </tr>
            <tr className="board_table_row">
              <th scope="row">1</th>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
        <table className="board_table">
          <caption>Q&A</caption>
          <thead className="board_table_head">
            <tr className="board_table_row">
              <th scope="col" width="100px;">
                Number
              </th>
              <th scope="col" width="300px;">
                Title
              </th>
              <th scope="col" width="100px;">
                Writer
              </th>
              <th scope="col" width="150px;">
                Date
              </th>
              <th scope="col" width="100px;">
                Views
              </th>
            </tr>
          </thead>
          <tbody className="board_table_body">
            <tr className="board_table_row">
              <th scope="row">2</th>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
            </tr>
            <tr className="board_table_row">
              <th scope="row">1</th>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
