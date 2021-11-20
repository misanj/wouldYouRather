import { getInitialData } from '../utils/api';
import { _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA';
import { receiveUsers, saveQuestionAnswer } from './users';
import { receiveQuestions, postQuestion } from './questions';
import { setAuthedUser } from './authedUser';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const AUTH_ID = null;

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(AUTH_ID));
      dispatch(hideLoading());
    });
  };
}

export function handleQuestionSave(payload) {
  return (dispatch) => {
    dispatch(showLoading());
    return _saveQuestionAnswer(payload).then(() => {
      dispatch(saveQuestionAnswer(payload));
      dispatch(hideLoading());
    });
  };
}

export function handlePostQuestion(payload) {
  return (dispatch) => {
    dispatch(showLoading());
    return _saveQuestion(payload).then((formattedQuestion) => {
      dispatch(postQuestion(formattedQuestion));
      dispatch(hideLoading());
    });
  };
}
