import axios from 'axios';
import moment from 'moment';

const getBoardListData = () => {
  //   const boardQuery = `query {
  //     board {

  //     }
  //   }`;

  //   return axios
  //     .post('/graphql', {
  //       query: boardQuery,
  //       variables: {},
  //     })
  //     .then((response) => {
  //       const { data, errors } = response.data;

  //       if (errors && errors.shift()) {
  //         console.error('no data availiable');
  //         return;
  //       }

  //       // eslint-disable-next-line consistent-return
  //       return data.userData;
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       // eslint-disable-next-line no-alert
  //       return err;
  //     });
  return [
    {
      no: 1,
      title: 'test',
      writer: 'me',
      date: moment(new Date()).format('MM-DD hh:mm:ss A'),
      views: 0,
    },
    {
      no: 2,
      title: 'test2',
      writer: 'you',
      date: moment(new Date()).format('MM-DD hh:mm:ss A'),
      views: 2,
    },
    {
      no: 3,
      title: 'test3',
      writer: 'that',
      date: moment(new Date()).format('MM-DD hh:mm:ss A'),
      views: 5,
    },
  ];
};

export default { getBoardListData };
