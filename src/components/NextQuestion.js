import React, { Component } from 'react';
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import { handleVoteAnsOne, handleVoteAnsTwo } from '../actions/questions';

class NextQuestion extends Component {
    state = {
        voted: false
    }

    componentWillMount() {
        this.props.dispatch(handleInitialData());

        const voted = this.didUserVoteForQuestion(this.props.question);
        this.setState({
            voted
        })
    }

    handleVoteOptionOne = (e) => {
        e.preventDefault();

        const { dispatch, question, user } = this.props;

        dispatch(handleVoteAnsOne(question.id, user.id));
    }

    handleVoteOptionTwo = (e) => {
        e.preventDefault();

        const { dispatch, question, user } = this.props;

        dispatch(handleVoteAnsTwo(question.id, user.id));
    }

    didUserVoteForQuestion(question) {
        const { user } = this.props;
        if (!question) {
            return null;
        }

        return question.optionOne.votes.includes(user.id) || question.optionTwo.votes.includes(user.id)
    }

    render() {
        const { question, user } = this.props;

        const ansOne = question ? question.optionOne.text : null;
        const ansTwo = question ? question.optionTwo.text : null;

        return (
            <div className="pricing-plan">
                {this.props.voted ? <VotedScreen question={question} userId={user.id} /> :
                    <div>
                        <h2 className="pricing-header">Would you rather...</h2>
                        <button onClick={this.handleVoteOptionOne} className="pricing-button">{ansOne}</button>
                        <button onClick={this.handleVoteOptionTwo} className="pricing-button">{ansTwo}</button>
                    </div>
                }

            </div>
        );
    }

}

function VotedScreen(props) {
    const { question, userId } = props;

    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;

    return (
        <div>
            <div>
                {question.optionOne.votes.includes(userId) && (<div>You voted:</div>)}
                {question.optionOne.text} - {question.optionOne.votes.length}/{totalVotes}
            </div>
            <div>
                {question.optionTwo.votes.includes(userId) && (<div>You voted:</div>)}
                {question.optionTwo.text} - {question.optionTwo.votes.length}/{totalVotes}
            </div>
        </div>
    )
}

function mapStateToProps({ authedUser, users, questions }, props) {
    const user = users[authedUser];
    const question = questions[props.match.params.id];
    const voted = user && question ? question.optionOne.votes.includes(user.id) || question.optionTwo.votes.includes(user.id) : null;

    return {
        user: user,
        question,
        voted
    }
}

export default connect(mapStateToProps)(NextQuestion)
