import * as userDao from '../dao/user-dao';

export function save(user) {
    return userDao.saveUser(user);
}

export function checkUser(username, password) {
    console.log('made it to the service');

    return userDao.checkUser(username, password);
}

// export function getUsers(users) {
//     return userDao.getUsers(users);
// }