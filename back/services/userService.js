import UserManager from "../models/sequelizer/managers/userManager";

const UserService = {
  // find user data by seq
  getUserDataBySeq: function ({ user_seq }, attr) {
    return UserManager.findUser({ user_seq }, attr);
  },
};

export default UserService;
