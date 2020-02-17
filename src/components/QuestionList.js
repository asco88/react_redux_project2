import React, { Component } from 'react';
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import { handleVoteAnsOne } from '../actions/questions';
import List from './List'


class QuestionList extends Component {
    state = {
        show: 'Not Completed'
    }

    componentWillMount() {
        this.props.dispatch(handleInitialData());
    }

    handleVoteOptionOne = (e) => {
        e.preventDefault();

        const { dispatch, question, user } = this.props;

        dispatch(handleVoteAnsOne(question.id, user.id));
    }

    didUserVoteForQuestion(question) {
        const { user } = this.props;

        return question.optionOne.votes.includes(user.id) || question.optionTwo.votes.includes(user.id)
    }

    renderList() {
        const { questions } = this.props;
        const completed = questions.filter(q => this.didUserVoteForQuestion(q));
        const notCompleted = questions.filter(q => !this.didUserVoteForQuestion(q));
        let list;

        switch (this.state.show) {
            case 'Completed':
                list = completed;
                break;
            case 'Not Completed':
                list = notCompleted;
                break;
            default:
                list = completed;
        }

        return (
            <div>
                <h2>{this.state.show}</h2>
                <List list={list} />
            </div>
        )
    }

    render() {
        return (
            <div className="pricing-plan">

                <button onClick={() => this.setState({ show: 'completed' })}>Show completed</button>
                <button onClick={() => this.setState({ show: 'Not Completed' })}>Show not completed</button>

                {this.renderList()}
            </div>
        );
    }

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
