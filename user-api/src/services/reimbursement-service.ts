import * as reimbusementDao from '../dao/reimbursement-dao';

export function save(reimbursement) {
    return reimbusementDao.saveReimbursement(reimbursement);
}

export function statusUpdate(status) {
    // console.log('Remibursement service');
    return reimbusementDao.statusUpdate(status);
}

// export function allReimbursementsByTime(timeSubmitted) {
//     // console.log('Reimbursement service');
//     return reimbusementDao.allReimbursementsByTime(timeSubmitted);
// }

// export function allReimbursements(username) {
//     // console.log('Reimbursement service');
//     return reimbusementDao.allReimbursements(username);
// }

export function reimbursementsByStatus(status) {
    // console.log('Reimbursement service');
    return reimbusementDao.reimbursementsByStatus(status);
}

export function reimbursementsByUsername(username) {
    // console.log('Reimbursement service');
    return reimbusementDao.reimbursementsByUsername(username);
}

export function reimbursementsByUsernameTime(username, timeSubmitted) {
    // console.log('Reimbursement service');
    return reimbusementDao.reimbursementsByUsernameTime(username, timeSubmitted);
}