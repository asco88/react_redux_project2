import { _saveQuestionAnswer, _saveQuestion } from '../utils/api'

export const RECEIVE_QUESTION = 'RECEIVE_QUESTION'
export const VOTE_ANSWER_ONE = 'VOTE_ANSWER_ONE';
export const VOTE_ANSWER_TWO = 'VOTE_ANSWER_TWO';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTION,
    questions,
  }
}

function voteAnsOne(questionId, userid) {
  return {
    type: VOTE_ANSWER_ONE,
    questionId,
    userid
  }
}

function voteAnsTwo(questionId, userid) {
  return {
    type: VOTE_ANSWER_TWO,
    questionId,
    userid
  }
}

export function handleVoteAnsOne(qid, authedUser) {
  return (dispatch) => {
    _saveQuestionAnswer({ authedUser, qid, answer: 'optionOne'})
    .then(() => {
      dispatch(voteAnsOne(qid, authedUser));
    })
  }
}

export function handleVoteAnsTwo(qid, authedUser) {
  return (dispatch) => {
    _saveQuestionAnswer({ authedUser, qid, answer: 'optionTwo'})
    .then(() => {
      dispatch(voteAnsTwo(qid, authedUser));
    })
  }
}

export function handleAddQuestion(question) {
  return (dispatch) => {
    _saveQuestion(question);
  }
}