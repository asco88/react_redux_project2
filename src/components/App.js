import React, { Component, Fragment } from 'react';
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NextQuestion from './NextQuestion'
import Menu from './Menu'
import QuestionList from './QuestionList'
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import Login from './Login';


class App extends Component {

    componentWillMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar />
                    <div className="background">
                        <div className="container">
                            <div className="panel pricing-table">
                                {this.props.loading ?
                                    <Route path='/login' component={Login} /> :
                                    <div>
                                        <Route path='/' exact component={QuestionList} />
                                        <Route path='/question/:id' component={NextQuestion} />
                                        <Route path='/add' component={NewQuestion} />
                                        <Route path='/leaderboard' component={LeaderBoard} />
                                        <Route path='/login' component={Login} />
                                    </div>}
                                <Menu />
                            </div>
                        </div>
                    </div>
                </Fragment>
            </Router>
        );
    }

}

function mapStateToProps({ authedUser, users }) {
    return {
        loading: authedUser === null,
        user: users[authedUser]
    }
}

export default connect(mapStateToProps)(App)
