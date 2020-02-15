import React, { Component } from 'react';
import { connect } from 'react-redux'

class LeaderBoard extends Component {
    render() {
        const { users, questions } = this.props;

        if (!users || !questions) {
            return null;
        }

        const scores = {};

        users.forEach(user => {
            scores[user.id] = { name: user.name, asked: user.questions.length, answered: 0 };
        });

        questions.forEach(q => {
            const { optionOne, optionTwo } = q;

            optionOne.votes.forEach(v => {
                scores[v].answered += 1;
            })

            optionTwo.votes.forEach(v => {
                scores[v].answered += 1;
            })

        });

        const scoresList = Object.keys(scores).map(q => scores[q]);
        scoresList.forEach(score => score.final = score.asked + score.answered);
        const sortedList = scoresList.sort((a, b) => b.final - a.final)

        return (
            <div className="pricing-plan">

                <h3 className='center'>Leader Board</h3>

                <div className="container">

                    <div className="table">
                        <div className="table-header">
                            <div className="header__item"><a id="name" className="filter__link">Name</a></div>
                            <div className="header__item"><a id="wins" className="filter__link filter__link--number">Score</a></div>
                            <div className="header__item"><a id="draws" className="filter__link filter__link--number">Asked</a></div>
                            <div className="header__item"><a id="losses" className="filter__link filter__link--number">Answered</a></div>
                        </div>

                        <div className="table-content">

                            {sortedList.map(score => (
                                <div className="table-row" key={score.name}>
                                    <div className="table-data">{score.name}</div>
                                    <div className="table-data">{score.final}</div>
                                    <div className="table-data">{score.asked}</div>
                                    <div className="table-data">{score.answered}</div>
                                </div>

                            ))}

                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps({ authedUser, users, questions }) {
    const qList = Object.keys(questions).map(q => questions[q]);
    const usersList = Object.keys(users).map(q => users[q]);

    return {
        loading: authedUser === null,
        users: usersList,
        authedUser,
        user: users[authedUser],
        questions: qList
    }
}

export default connect(mapStateToProps)(LeaderBoard)
