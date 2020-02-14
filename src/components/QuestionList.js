import React, { Component, Fragment } from 'react';
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { handleVoteAnsOne } from '../actions/questions';
import { NavLink, Link, withRouter } from 'react-router-dom'



class QuestionList extends Component {

    componentWillMount() {
        this.props.dispatch(handleInitialData());
    }

    handleVoteOptionOne = (e) => {
        e.preventDefault();

        const { dispatch, question, user } = this.props;

        dispatch(handleVoteAnsOne(question.id, user.id));
    }

    didUserVoteForQuestion(question) {
        const {user} = this.props;

        return question.optionOne.votes.includes(user.id) || question.optionTwo.votes.includes(user.id)
    }

    render() {
        const { questions } = this.props;
        const completed = questions.filter(q => this.didUserVoteForQuestion(q));
        const notCompleted = questions.filter(q => !this.didUserVoteForQuestion(q));

        return (
            <div className="pricing-plan">
                <h2>Not Completed</h2>
                <List list={notCompleted} />
                <h2>Completed</h2>
                <List list={completed} />
            </div>
        );
    }

}

function List(props) {
    return (
        props.list ? props.list.map(q => (
            <div className="pricing-features-item">
                <div>
                    <span>{q.author} asks:</span>
                    <Link to={`/question/${q.id}`} className='tweet'>
                        vote
                    </Link>
                </div>
            </div>
        )) : null
    )
}

function mapStateToProps({ authedUser, users, questions }) {
    const user = users[authedUser];
    const qList = Object.keys(questions).map(q => questions[q]);

    return {
        loading: authedUser === null,
        user,
        questions: qList
    }
}

export default connect(mapStateToProps)(QuestionList)
