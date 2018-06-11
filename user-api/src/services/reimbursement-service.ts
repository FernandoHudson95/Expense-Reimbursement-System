import * as reimbusementDao from '../dao/reimbursement-dao';

export function save(reimbursement) {
    return reimbusementDao.saveReimbursement(reimbursement);
}

export function statusUpdate(timeSubmitted) {
    // console.log('Remibursement service');
    return reimbusementDao.statusUpdate(timeSubmitted);
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