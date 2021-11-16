import { RECEIVE_USERS, SELECT_ANSWER } from '../Actions/users'
import { POST_QUESTIONS } from '../Actions/questions'


export default function users (state = {}, action){
  switch(action.type){
    case RECEIVE_USERS:
      return{
        ...state,
        ...action.users
      }
      
    case SELECT_ANSWER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer
          }
        }
      }
      
    case POST_QUESTIONS:
      const { question } = action
      return { 
        ...state,
        [question.author]: { 
          ...state[question.author],
          questions: state[question.author].questions.concat([question.id])
        }
      }
    
    default:
      return state    
  }
}
