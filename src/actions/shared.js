import { _getQuestions, _getUsers } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { showLoading, hideLoading } from 'react-redux-loading'


export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())

        return Promise.all([
            _getUsers(),
            _getQuestions(),
        ]).then(([users, questions]) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
            dispatch(hideLoading());
        });
    }
}