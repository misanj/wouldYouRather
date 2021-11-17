export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SELECT_ANSWER = 'SELECT_ANSWER';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function selectAnswer({ authedUser, qid, answer }) {
  return {
    type: SELECT_ANSWER,
    authedUser,
    qid,
    answer,
  };
}
