export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_ANSWER = 'SAVE_ANSWER';
export const POST_QUESTIONS = 'POST_QUESTIONS';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function saveAnswer({ authedUser, qid, answer }) {
  return {
    type: SAVE_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function postQuestion(formattedQuestion) {
  return {
    type: POST_QUESTIONS,
    question: formattedQuestion,
  };
}
