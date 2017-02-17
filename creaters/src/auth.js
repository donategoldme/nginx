import {request} from './utils';

export function getUserData() {
    return request('/api/users/user');
}
