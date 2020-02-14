import { RECEIVE_QUESTION, VOTE_ANSWER_ONE, VOTE_ANSWER_TWO } from '../actions/questions'

export default function users(state = {}, action) {
  let question = undefined;
  switch (action.type) {
    case RECEIVE_QUESTION:
      return {
        ...state,
        ...action.questions
      }
    case VOTE_ANSWER_ONE:
      question = state[action.questionId];
      question.optionOne.votes.push(action.userid);
      return {
        ...state,
        question
      }
    case VOTE_ANSWER_TWO:
      question = state[action.questionId];
      question.optionTwo.votes.push(action.userid);
      return {
        ...state,
        question
      }
    default:
      return state
  }
}
