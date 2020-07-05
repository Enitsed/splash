import axios from 'axios';

const getCategoryData = () => {
  //   const categoryQuery = `query {
  //     category {

  //     }
  //   }`;

  //   return axios
  //     .post('/graphql', {
  //       query: categoryQuery,
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
    { name: 'Freeboard', id: 1 },
    { name: 'Q&A', id: 2 },
    { name: 'Notice', id: 3 },
  ];
};

export { getCategoryData };
