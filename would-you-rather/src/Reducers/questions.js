import {
  RECEIVE_QUESTIONS,
  SAVE_QUESTION_ANSWER,
  POST_QUESTIONS,
} from '../actions/questions';

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };

    case SAVE_QUESTION_ANSWER:
      const { authedUser, qid, answer } = action;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: [...state[qid][answer].votes, authedUser],
          },
        },
      };

    case POST_QUESTIONS:
      const { question } = action;
      return {
        ...state,
        [question.id]: question,
      };

    default:
      return state;
  }
}
