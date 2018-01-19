import users from './usersPersistence.mjs';

class UserService {
  constructor() {
    this.users = users;
  }

  getUsers() {
    return this.users;
  }
}

export default UserService;
