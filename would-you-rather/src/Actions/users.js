export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';
import { _saveQuestionAnswer } from '../utils/_DATA';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function saveQuestionAnswer({ authedUser, qid, answer }) {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  };
}
