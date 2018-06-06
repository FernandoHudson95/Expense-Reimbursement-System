import * as userDao from '../dao/user-dao';

export function save(user) {
    return userDao.saveUser(user);
}

// export function getUsers(users) {
//     return userDao.getUsers(users);
// }