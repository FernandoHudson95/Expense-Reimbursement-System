import * as userDao from '../dao/user-dao';

export function save(user) {
    return userDao.saveUser(user);
}

export function checkUser(username){
    return userDao.checkUser(username);
}

// export function getUsers(users) {
//     return userDao.getUsers(users);
// }