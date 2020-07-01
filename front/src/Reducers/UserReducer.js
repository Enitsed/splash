import { LOG_IN, LOG_OUT } from './Actions/UserAction';

// define User Initial States
const initialState = {
  userData: {
    user_name: '',
    user_id: '',
  },
};

// write reducer here
const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOG_IN:
      return payload;
    case LOG_OUT:
      return payload;
    default:
      return state;
  }
};

export default UserReducer;
